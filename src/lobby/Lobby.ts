module lobby {
  export class Lobby {
    private resource: string
    lobby: Laya.Scene
    desktopInfo: LobbyScene
    replay: LobbyScene
    paipu: LobbyScene
    lobbyUI: LobbyScene
    constructor(resource: string) {
      this.resource = resource
      Laya.loader.create(
        [
          { url: resource },
          { url: 'res/atlas/myres/achievement.atlas' },
          { url: 'res/atlas/myres/activity_sign.atlas' },
          { url: 'res/atlas/myres/bothui.atlas' },
          { url: 'res/atlas/myres/entrance.atlas' },
          { url: 'res/atlas/myres/get_character.atlas' },
          { url: 'res/atlas/myres/info.atlas' },
          { url: 'res/atlas/myres/liandong.atlas' },
          { url: 'res/atlas/myres/lobby.atlas' },
          { url: 'res/atlas/myres/match_lobby.atlas' },
          { url: 'res/atlas/myres/necessary.atlas' },
          { url: 'res/atlas/myres/refund.atlas' },
          { url: 'res/atlas/myres/room.atlas' },
          { url: 'res/atlas/myres/bothui.atlas' },
          { url: 'res/atlas/myres/shop.atlas' },
          { url: 'res/atlas/myres/sushe.atlas' },
          { url: 'res/atlas/myres/treasure.atlas' },
          { url: 'res/atlas/myres/yueka.atlas' },
          { url: 'res/atlas/myres/mjdesktop.atlas' },
          { url: 'res/atlas/myres/mjdesktop/number.atlas' },
          { url: 'res/atlas/myres.atlas' },
          // { url: 'res/atlas/bitmapfont.atlas' },
          { url: 'res/atlas/myres2/mjp/mjp_default/ui.atlas' },
        ],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    completeHandler() {
      this.lobby = Laya.loader.getRes(this.resource) as Laya.Scene
      Laya.loader.load(
        [
          'bitmapfont/fengyu.ttf',
          'bitmapfont/hanyi.ttf',
          'bitmapfont/haolong.ttf',
        ],
        Laya.Handler.create(this, () => {
          this.onLoadFont()
        }),
        null,
        Laya.Loader.TTF,
        0,
        true
      )
    }
    private onLoadFont(): void {
      Laya.loader.load(
        [
          { url: 'uiconfig/ui.json', type: Laya.Loader.JSON },
          { url: 'res/tutorial/charpter1.json', type: Laya.Loader.JSON },
          { url: 'res/shader/outline/outline.ps', type: Laya.Loader.TEXT },
          { url: 'res/shader/outline/outline.vs', type: Laya.Loader.TEXT },
          { url: 'res/shader/outline/outline1.ps', type: Laya.Loader.TEXT },
          { url: 'res/shader/outline/outline1.vs', type: Laya.Loader.TEXT },
          { url: 'res/shader/cartoon/cartoon.ps', type: Laya.Loader.TEXT },
          { url: 'res/shader/cartoon/cartoon.vs', type: Laya.Loader.TEXT },
        ],
        Laya.Handler.create(this, this.onLoadUI)
      )
      Laya.stage.addChild(this.lobby)
    }
    private onLoadUI(): void {
      console.log(Laya.loader.getRes('myres/vscroll$bar.png'))
      new caps.Outline().initShader()
      new caps.Cartoon().initShader()
      Laya.View.uiMap = Laya.loader.getRes('uiconfig/ui.json')
      this.lobbyUI = new lobby.LobbyUI()
      Laya.stage.addChild(this.lobbyUI)
    }
  }
}
