module capsui {
  export class CScrollView_Heng {
    scrollView: Laya.Sprite
    constructor() {}
    /**
     *设置owner函数，可以直接获取到添加附加脚本的组件实例
     **/
    public set owner(value: any) {
      this.scrollView = value
      //自定义的脚本会有时序问题，所以在此添加一个延时
      this.scrollView.frameOnce(2, this, this.onLoaded)
    }
    private onLoaded(): void {
      this.scrollView.on(Laya.Event.CLICK, this, this.mouseDown)
    }
    mouseDown() {
      console.log(this.scrollView.name)
    }
  }
}
