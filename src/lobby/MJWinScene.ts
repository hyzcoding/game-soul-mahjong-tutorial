module lobby {
  export class MJWin extends LobbyScene {
    name: string = 'mjwin'
    constructor() {
      super()
    }
    createChildren(): void {
      super.createChildren()
      this.createView(Laya.View.uiMap['mj/win'])
    }
  }
}
