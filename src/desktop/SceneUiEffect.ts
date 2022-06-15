module mjdesktop {
  export class SceneUiEffect {
    private ui_effect: Laya.Scene
    constructor() {
      Laya.loader.create(
        [{ url: 'res/scene/scene_ui_effect.ls' }],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    private completeHandler() {
      this.ui_effect = Laya.loader.getRes('res/scene/scene_ui_effect.ls')
      this.ui_effect.zOrder = 1
      Laya.stage.addChild(this.ui_effect)
    }
  }
}
