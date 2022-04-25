import Mjdesktop = desktop.Mjdesktop
import MjHandPai = mjdesktop.MjHandPai
import UI = ui.UI
import MjPaiControlScript = script.MjPaiControlScript
// 程序入口
class LayaAir3D {
  private roleAni: Laya.Animation
  private mjdesktop: Mjdesktop
  private ui: UI
  private mjhandpai: MjHandPai
  private tablecloth: Laya.Sprite3D
  private light: Laya.SpotLight
  constructor() {
    //初始化引擎
    Laya3D.init(1707, 960, true)
    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
    Laya.stage.alignV = Laya.Stage.ALIGN_CENTER
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE
  }
  onload() {
    this.mjdesktop = new Mjdesktop(
      'res/scene/mjdesktop.ls',
      'res/scene/tablecloth_default.lh'
    )
    this.mjhandpai = new MjHandPai('res/scene/mjhandpai.ls')
    this.ui = new UI(['res/atlas/chs_t/myres/mjdesktop.atlas'])
  }
}
var layaProject = new LayaAir3D()
layaProject.onload()
