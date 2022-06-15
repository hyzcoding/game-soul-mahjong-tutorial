module mjdesktop {
  export class SceneClickEffect {
    private click_effect: Laya.Scene
    constructor() {
      Laya.loader.create(
        [{ url: 'res/scene/scene_click_effect.ls' }],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    private completeHandler() {
      this.click_effect = Laya.loader.getRes('res/scene/scene_click_effect.ls')
      this.click_effect.zOrder = 1
      Laya.stage.addChild(this.click_effect)
    }
  }
}
