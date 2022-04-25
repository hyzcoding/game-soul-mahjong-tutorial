module mjdesktop {
  export class MjHandPai {
    private resource: string
    private mjhandpai: Laya.Scene
    private camera: Laya.Camera
    private root: Laya.Sprite3D
    private my_mjp_frames: string[]
    private my_mjp_image_prefix: string = 'chs_t/myres2/mjp/mjp_default/ui/'
    private png_suffix = '.png'
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
      this.mjhandpai = Laya.loader.getRes(this.resource)
      this.camera = this.mjhandpai.getChildByName('camera') as Laya.Camera
      this.root = this.mjhandpai.getChildByName('root') as Laya.Sprite3D
      var hands = this.root.getChildAt(0) as Laya.Sprite3D
      var pai = hands.getChildByName('pai') as Laya.MeshSprite3D
      pai.addComponent(MjPaiControlScript)
      var pai1: Laya.MeshSprite3D = Laya.Sprite3D.instantiate(
        pai,
        hands,
        false
        // location1
      ) as Laya.MeshSprite3D
      hands.addChild(pai1)
      // pai1.meshRender.material = Laya.loader.getRes(
      //   'res/scene/Asset/Resource/mjpai/mjp_default/hand_ui.png'
      // )
      console.log(hands)
      var mjp_image: string = this.my_mjp_image_prefix
        .concat(this.my_mjp_frames[0])
        .concat(this.png_suffix)
      //创建标准材质
      var material: Laya.StandardMaterial = new Laya.StandardMaterial()
      //创建漫反射二维纹理贴图
      var sprite = new Laya.Sprite()

      //   this.root.removeChildAt(0)
      Laya.stage.addChild(this.mjhandpai)
      //   this.root.addChild(child1)
    }
  }
}
