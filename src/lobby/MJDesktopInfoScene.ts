module lobby {
  export class MJDesktopInfo extends LobbyScene {
    name: string = 'mjdesktopinfo'
    private container_lefttop: Laya.Sprite
    private container_doras: Laya.Sprite
    constructor(resource: string, id: string) {
      super()
      this.init()
    }
    private init(): void {
      this.container_lefttop = this.getChildByName(
        'container_lefttop'
      ) as Laya.Sprite
      this.container_doras = this.container_lefttop.getChildByName(
        'container_doras'
      ) as Laya.Sprite
    }
    createChildren(): void {
      super.createChildren()
      this.createView(Laya.View.uiMap['mj/desktopInfo'])
    }
  }
}
