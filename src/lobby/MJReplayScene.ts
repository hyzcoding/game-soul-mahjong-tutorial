module lobby {
  export class MJReplay extends LobbyScene {
    name: string = 'mjreplay'
    info_paishan: Laya.Sprite
    info_tip: Laya.Sprite
    info_chang: Laya.Sprite
    info_xun: Laya.Sprite
    pop_collect: Laya.Sprite
    constructor() {
      super()
      this.init()
    }
    private init() {
      this.info_paishan = this.getChildByName('info_paishan') as Laya.Sprite
      this.info_paishan.visible = false
      this.info_tip = this.getChildByName('info_tip') as Laya.Sprite
      this.info_tip.visible = false
      this.info_chang = this.getChildByName('info_chang') as Laya.Sprite
      this.info_chang.visible = false
      this.info_xun = this.getChildByName('info_xun') as Laya.Sprite
      this.info_xun.visible = false
      this.pop_collect = this.getChildByName('pop_collect') as Laya.Sprite
      this.pop_collect.visible = false
    }
    createChildren(): void {
      super.createChildren()
      this.createView(Laya.View.uiMap['mj/replay'])
    }
  }
}
