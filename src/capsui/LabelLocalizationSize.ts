module capsui {
  export class LabelLocalizationSize {
    label: Laya.Label
    constructor() {}
    /**
     *设置owner函数，可以直接获取到添加附加脚本的组件实例
     **/
    public set owner(value: any) {
      this.label = value
      //自定义的脚本会有时序问题，所以在此添加一个延时
      this.label.frameOnce(2, this, this.onLoaded)
    }
    private onLoaded(): void {
      this.label.on(Laya.Event.CLICK, this, this.mouseDown)
    }
    mouseDown() {
      var paipu = Laya.stage.getChildByName('paipu') as lobby.PaiPuUI
      if (paipu != null) {
        var btn_parent = this.label.parent as Laya.Button
        if (btn_parent.name === 'check_next') {
          paipu.changePageNext()
        } else if (btn_parent.name === 'check_pre') {
          paipu.changePagePre()
        } else if (paipu.tabs.getChildByName(btn_parent.name)) {
          paipu.tabChange(btn_parent.name)
        }
      }
    }
  }
}
