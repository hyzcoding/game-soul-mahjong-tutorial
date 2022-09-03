///<reference path = '../sprite/MJHandSprite.ts'  />
module mjdesktop {
  export class MjHandPai {
    private resource: string
    private mjhandpai: Laya.Scene
    private paiList: Laya.Sprite3D[]
    private hands: Laya.Sprite3D
    private camera: Laya.Camera
    private root: Laya.Sprite3D
    private mjp_texture: Laya.Texture2D
    private my_mjp_frames: string[]
    private my_mjp_image_prefix: string = 'myres2/mjp/mjp_default/ui/'
    private png_suffix = '.png'
    private mjhandpai_ui_pos
    private ray
    private _outHitInfo
    private point
    private pai
    private index_click
    private interval: number = 0.8000004291534424
    private x: number = 2.549999952316284
    private y: number = 0.800000011920929
    private z: number = -0.23999999463558197
    effect_dianji: Laya.MeshSprite3D
    effect_dora: Laya.MeshSprite3D
    effect_recommend: Laya.MeshSprite3D
    unit: JSON
    constructor(resource: string, unit: JSON) {
      this.resource = resource
      Laya.loader.create(
        [
          { url: resource },
          { url: 'res/atlas/myres2/mjp/mjp_default/ui.atlas' },
        ],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    private initPai(name: string, pos_x: number) {
      var pai = Laya.Sprite3D.instantiate(
        this.pai,
        this.hands,
        false
      ) as Laya.MeshSprite3D
      pai.active = true
      // var pai = this.pai as Laya.MeshSprite3D
      var material = pai.meshRender.material as Laya.BlinnPhongMaterial
      var to = material.tilingOffset.elements
      var arr = this.mjhandpai_ui_pos[name]
      to[2] = arr[0]
      to[3] = arr[1]
      material.albedoTexture = this.mjp_texture
      pai.transform.localPosition = new Laya.Vector3(pos_x, 0, this.z)
      this.hands.addChild(pai)
    }
    private completeHandler() {
      this.mjp_texture = Laya.Texture2D.load(
        'res/scene/Assets/Resource/mjpai/mjp_default/hand_ui.png'
      ) as Laya.Texture2D
      this.mjhandpai = Laya.loader.getRes(this.resource) as Laya.Scene
      this.camera = this.mjhandpai.getChildByName('camera') as Laya.Camera
      this.root = this.mjhandpai.getChildByName('root') as Laya.Sprite3D
      //创建一条射线
      this.point = new Laya.Vector2()
      this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3())
      this.hands = this.root.getChildAt(0) as Laya.Sprite3D
      this.paiList = this.hands._childs
      this.pai = this.hands.getChildByName('pai') as sprite.MJHandSprite
      this.pai.isdora = true
      this.pai.active = false
      this.effect_dianji = this.hands.getChildByName(
        'effect_dianji'
      ) as Laya.MeshSprite3D
      this.effect_dianji.active = true
      this.effect_dianji.transform.localPosition.x = 0
      this.effect_dianji.transform.localPosition.y = 0
      this.effect_dora = this.hands.getChildByName(
        'effect_dora'
      ) as Laya.MeshSprite3D
      this.effect_dora.active = false
      this.effect_dora.transform.localPosition.x = 0
      this.effect_dora.transform.localPosition.y = 0
      this.effect_recommend = this.hands.getChildByName(
        'effect_recommend'
      ) as Laya.MeshSprite3D
      this.effect_recommend.active = false

      //添加网格型碰撞器组件
      var boxCollider: Laya.BoxCollider = this.pai.getComponentByIndex(
        0
      ) as Laya.BoxCollider
      var boundingBox = this.pai.meshFilter.sharedMesh
        .boundingBox as Laya.BoundBox
      boundingBox.min.y -= this.y + 1
      //为盒形碰撞器设置盒子大小（否则没有尺寸，无法被射线检测）
      boxCollider.setFromBoundBox(boundingBox)

      Laya.loader.load(
        [
          {
            url: 'res/scene/Assets/Resource/mjpai/mjp_default/hand_ui.json',
            type: Laya.Loader.JSON,
          },
          { url: 'res/tutorial/charpter1/unit1.json', type: Laya.Loader.JSON },
        ],
        Laya.Handler.create(this, this.initAll)
      )
      this._outHitInfo = new Laya.RaycastHit()
      Laya.stage.addChild(this.mjhandpai)
      Laya.timer.frameLoop(1, this, this.checkHit)
      Laya.stage.on(Laya.Event.DOUBLE_CLICK, this, this.doubleClick)
    }
    public offEvent() {
      Laya.stage.off(Laya.Event.DOUBLE_CLICK, this, this.doubleClick)
    }
    private initAll() {
      this.mjhandpai_ui_pos = Laya.loader.getRes(
        'res/scene/Assets/Resource/mjpai/mjp_default/hand_ui.json'
      ) as JSON
      this.unit = Laya.loader.getRes(
        'res/tutorial/charpter1/unit1.json'
      ) as JSON
      var arr = this.unit['hand_mjp']
      var ai = 0
      arr.forEach((val: string[], idx: number) => {
        // ai += idx * this.x
        val.forEach((v: string, i: number) => {
          this.initPai(v, ai)
          ai += this.x
        })
        ai += this.interval
      })
    }
    public doubleClick() {
      if (this._outHitInfo.distance !== -1) {
        console.log('doubleClick')
      }
    }
    private checkHit(): void {
      //从屏幕空间生成射线
      this.point.elements[0] = Laya.MouseManager.instance.mouseX
      this.point.elements[1] = Laya.MouseManager.instance.mouseY
      this.camera.viewportPointToRay(this.point, this.ray)
      var pai = this._outHitInfo.sprite3D as Laya.Sprite3D
      // 选中
      if (
        this._outHitInfo.distance !== -1 &&
        pai.transform.localPosition.y < this.y
      ) {
        if (this.index_click) {
          var pai_before = this.hands.getChildAt(
            this.index_click
          ) as Laya.Sprite3D
          pai_before.transform.translate(new Laya.Vector3(0, -this.y, 0))
        }

        this.index_click = this.hands.getChildIndex(pai)
        // this._outHitInfo.sprite3D.transform.localPosition.y = this.y
        this._outHitInfo.sprite3D.transform.translate(
          new Laya.Vector3(0, this.y, 0)
        )
        // 未选中
      } else if (this.index_click && this._outHitInfo.distance == -1) {
        pai = this.hands.getChildAt(this.index_click) as Laya.Sprite3D
        var pos = pai.transform.localPosition
        var pos_ray = this._outHitInfo.position
        pai.transform.translate(new Laya.Vector3(0, -this.y, 0))
        this.index_click = null
      }
      Laya.Physics.rayCast(this.ray, this._outHitInfo, 30, 0)
    }
  }
}
