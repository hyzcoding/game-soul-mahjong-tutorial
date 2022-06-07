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
      // pai.addComponent(MjHandPaiScript)
      this.mjp_texture = Laya.Texture2D.load(
        'res/scene/Assets/Resource/mjpai/mjp_default/hand_ui.png'
      ) as Laya.Texture2D

      var material = pai.meshRender.material as Laya.BlinnPhongMaterial
      var to = material.tilingOffset.elements
      to[2] = 0.5
      to[3] = -0.25
      material.albedoTexture = this.mjp_texture
      var position = pai.transform.position
      var mjp_image: string = this.my_mjp_image_prefix
        .concat(this.my_mjp_frames[0])
        .concat(this.png_suffix)
      Laya.stage.addChild(this.mjhandpai)
    }
  }
}
