// 程序入口
class LayaAir3D {
  private roleAni: Laya.Animation
  private mjdesktop: mjdesktop.Mjdesktop
  private mjhandpai: mjdesktop.MjHandPai
  private tablecloth: Laya.Sprite3D
  private light: Laya.SpotLight
  lobby: lobby.Lobby
  scene_click_effect: mjdesktop.SceneClickEffect
  scene_ui_effect: mjdesktop.SceneUiEffect
  constructor() {
    //初始化引擎
    Laya3D.init(1920, 1080, true)
    Laya.Stat.show(0, 0)
    //适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE
    Laya.stage.bgColor = '#000000'
    Laya.stage.screenMode = Laya.Stage.SCREEN_NONE
  }
  onload() {
    this.lobby = new lobby.Lobby('res/scene/lobby.ls')
  }
}
var layaProject = new LayaAir3D()
layaProject.onload()
