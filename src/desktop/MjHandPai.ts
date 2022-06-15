module mjdesktop {
  export class MjHandPai {
    private resource: string
    private mjhandpai: Laya.Scene
    private camera: Laya.Camera
    private root: Laya.Sprite3D
    private mjp_texture: Laya.Texture2D
    private my_mjp_frames: string[]
    private my_mjp_image_prefix: string = 'chs_t/myres2/mjp/mjp_default/ui/'
    private png_suffix = '.png'
    private ray
    private _outHitInfo
    private point
    private box
    private index_click
    constructor(resource: string) {
      this.my_mjp_frames = [
        '0m',
        '0p',
        '0s',
        '1m',
        '1p',
        '1s',
        '1z',
        '2m',
        '2p',
        '2s',
        '2z',
        '3m',
        '3p',
        '3s',
        '3z',
        '4m',
        '4p',
        '4s',
        '4z',
        '5m',
        '5p',
        '5s',
        '5z',
        '6m',
        '6p',
        '6s',
        '6z',
        '7m',
        '7p',
        '7s',
        '7z',
        '8m',
        '8p',
        '8s',
        '9m',
        '9p',
        '9s',
        'back',
      ]
      this.resource = resource
      Laya.loader.create(
        [
          { url: resource },
          { url: 'res/atlas/chs_t/myres2/mjp/mjp_default/ui.atlas' },
        ],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    private completeHandler() {
      this.mjhandpai = Laya.loader.getRes(this.resource) as Laya.Scene
      this.camera = this.mjhandpai.getChildByName('camera') as Laya.Camera
      this.root = this.mjhandpai.getChildByName('root') as Laya.Sprite3D
      //创建一条射线
      this.point = new Laya.Vector2()
      this.ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3())
      var hands = this.root.getChildAt(0) as Laya.Sprite3D
      this.box = hands.getChildByName('pai') as Laya.MeshSprite3D
      // pai.addComponent(script.MjHandPaiScript)
      this.mjp_texture = Laya.Texture2D.load(
        'res/scene/Assets/Resource/mjpai/mjp_default/hand_ui.png'
      ) as Laya.Texture2D
      //添加网格型碰撞器组件
      var boxCollider: Laya.BoxCollider = this.box.getComponentByIndex(
        0
      ) as Laya.BoxCollider
      //为盒形碰撞器设置盒子大小（否则没有尺寸，无法被射线检测）
      boxCollider.setFromBoundBox(this.box.meshFilter.sharedMesh.boundingBox)
      this._outHitInfo = new Laya.RaycastHit()
      var material = this.box.meshRender.material as Laya.BlinnPhongMaterial
      var to = material.tilingOffset.elements
      to[2] = 0.5
      to[3] = -0.25
      material.albedoTexture = this.mjp_texture
      Laya.stage.addChild(this.mjhandpai)
      Laya.timer.frameLoop(1, this, this.checkHit)
      this.mjhandpai.on(Laya.Event.DOUBLE_CLICK, this, this.doubleClick)
    }
    private doubleClick() {}
    private checkHit(): void {
      // this.box.transform.position = this._position
      // this.box.transform.rotation = this._quaternion

      //从屏幕空间生成射线
      this.point.elements[0] = Laya.MouseManager.instance.mouseX
      this.point.elements[1] = Laya.MouseManager.instance.mouseY
      this.camera.viewportPointToRay(this.point, this.ray)

      let sprite = this._outHitInfo.sprite3D as Laya.Sprite3D
      if (
        this._outHitInfo.distance !== -1 &&
        sprite.transform.localPosition.y < 0
      ) {
        console.log(sprite)
        // this._outHitInfo.sprite3D.transform.localPosition.y = 0
        this._outHitInfo.sprite3D.transform.translate(
          new Laya.Vector3(0, 0.05999999865889549, 0)
        )
      }
      Laya.Physics.rayCast(this.ray, this._outHitInfo, 30, 0)
    }
  }
}
