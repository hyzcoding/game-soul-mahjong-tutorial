module ui {
  export class MJUIDesktop {
    private ui_images: { [key: string]: Laya.Image }
    private ui_image_prefix: string = 'chs_t/myres/mjdesktop/'
    private ui_mjp_image_prefix: string = 'chs_t/myres2/mjp/mjp_default/ui/'
    private ui_number_prefix: string = 'chs_t/myres/mjdesktop/number/'
    private png_suffix = '.png'
    constructor() {
      Laya.loader.load(
        [
          // 麻将桌
          {
            url: 'res/atlas/chs_t/myres2/mjp/mjp_default/ui.atlas',
            type: Laya.Loader.ATLAS,
          },
          // 麻将牌
          {
            url: 'res/atlas/chs_t/myres/mjdesktop.atlas',
            type: Laya.Loader.ATLAS,
          },
          // 立直数字
          {
            url: 'res/atlas/chs_t/myres/mjdesktop/number.atlas',
            type: Laya.Loader.ATLAS,
          },
          { url: 'res/ui/mjdesktop/mjdesktop.json', type: Laya.Loader.JSON },
          { url: 'res/ui/mjdesktop/position.json', type: Laya.Loader.JSON },
          { url: 'res/ui/mjdesktop/position_mjp.json', type: Laya.Loader.JSON },
        ],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    private completeHandler() {
      var sprite = new Laya.Image()
      var position: JSON = Laya.loader.getRes('res/ui/mjdesktop/position.json')
      var keys = Object.keys(position)
      this.ui_images = {}
      keys.forEach((frame) => {
        this.ui_images[frame] = new Laya.Image()
        this.ui_images[frame].skin = this.ui_image_prefix
          .concat(frame)
          .concat(this.png_suffix)
        this.ui_images[frame].x = position[frame].x
        this.ui_images[frame].y = position[frame].y
        this.ui_images[frame].width = position[frame].width
        this.ui_images[frame].height = position[frame].height
        sprite.addChild(this.ui_images[frame])
      })
      var img_mjp = {}
      var position_mjp: JSON = Laya.loader.getRes(
        'res/ui/mjdesktop/position_mjp.json'
      )
      var sprite2 = new Laya.Image()
      sprite2.x = 28
      sprite2.y = 44
      position_mjp['dora'].forEach((frame) => {
        img_mjp[frame] = new Laya.Image()
        img_mjp[frame].skin = this.ui_mjp_image_prefix
          .concat(frame.name)
          .concat(this.png_suffix)
        img_mjp[frame].x = frame.x
        img_mjp[frame].y = frame.y
        img_mjp[frame].width = 54
        img_mjp[frame].height = 81
        sprite2.addChild(img_mjp[frame])
      })
      var sprite_number = new Laya.Image()
      sprite_number.skin = this.ui_number_prefix
        .concat('t_0')
        .concat(this.png_suffix)
      sprite_number.x = 117
      sprite_number.y = 139
      sprite_number.width = 24
      sprite_number.height = 36
      var sprite_number1 = new Laya.Image()
      sprite_number1.skin = this.ui_number_prefix
        .concat('t_0')
        .concat(this.png_suffix)
      sprite_number1.x = 117
      sprite_number1.y = 139
      sprite_number1.width = 24
      sprite_number1.height = 36
      sprite.addChild(sprite_number)
      sprite.addChild(sprite_number1)
      sprite.addChild(sprite2)
      Laya.stage.addChild(sprite)
    }
  }
}
