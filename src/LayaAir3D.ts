///<reference path ='./desktop/Mjdesktop.ts'/>
///<reference path = './desktop/MjHandPai.ts' />
// 程序入口
class LayaAir3D {
  private roleAni: Laya.Animation
  private mjdesktop: mjdesktop.Mjdesktop
  private mjhandpai: mjdesktop.MjHandPai
  private tablecloth: Laya.Sprite3D
  private light: Laya.SpotLight
  constructor() {
    //初始化引擎
    Laya3D.init(1707, 960, true)
    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE
    Laya.stage.bgColor = '#000000'
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE
  }
  onload() {
    // this.mjdesktop = new mjdesktop.Mjdesktop(
    //   'res/scene/mjdesktop.ls',
    //   'res/scene/tablecloth_default.lh'
    // )
    this.mjhandpai = new mjdesktop.MjHandPai('res/scene/mjhandpai.ls')
    // new ui.MJUIDesktop()
  }
}
var layaProject = new LayaAir3D()
layaProject.onload()
