module capsui {
  /**
   * 通用按钮
   */
  export class CButton {
    /*脚本所属的3D对象*/
    private button: Laya.Button
    constructor() {}
    /**
     *设置owner函数，可以直接获取到添加附加脚本的组件实例
     **/
    public set owner(value: any) {
      this.button = value
      //自定义的脚本会有时序问题，所以在此添加一个延时
      this.button.frameOnce(2, this, this.onLoaded)
    }
    private onLoaded(): void {
      this.button.on(Laya.Event.CLICK, this, this.mouseDown)
    }
    mouseDown() {
      if (this.button.name == 'lobby_btn_paipu') {
        var lobbyScene = Laya.stage.getChildByName('lobby') as Laya.Scene
        lobbyScene.visible = false
        Laya.stage.removeChildByName('lobby_ui')
        Laya.stage.addChild(
          new lobby.PaiPuUI('res/tutorial/outline.json', 'charpter1')
        )
      } else if (this.button.name === 'btn_input') {
        let paipuScene = Laya.stage.getChildByName('paipu') as lobby.PaiPuUI
        paipuScene.pop_collect_sp.visible = true
      } else if (this.button.name === 'btn_close') {
        let parent = this.button.parent as Laya.Sprite
        let parentRoot = parent.parent as Laya.Sprite
        parentRoot.visible = false
      } else if (this.button.name == 'check') {
        let parent = this.button.parent as Laya.Box
        var data = parent.dataSource as JSON
        console.log(data['id'])
        Laya.stage.removeChildByName('paipu')
        // var mjdesktopinfo = new lobby.MJDesktopInfo('', data['id'])
        // var replay = new lobby.MJReplay()
        var mjdesktop3d = Laya.stage.getChildByName('mjdesktop') as Laya.Scene
        if (mjdesktop3d) {
          mjdesktop3d.visible = true
        } else {
          var mjdesktopUI = new mjdesktop.Mjdesktop(
            'res/scene/mjdesktop.ls',
            'res/scene/tablecloth_default.lh'
          )
        }

        // var hjhd = Laya.stage.getChildByName('mjhandpai') as Laya.Scene
        // if (hjhd) {
        //   hjhd.visible = true
        // } else {
        //   var mjhand = new mjdesktop.MjHandPai(
        //     'res/scene/mjhandpai.ls',
        //     data['id']
        //   )
        // }
        // Laya.stage.addChild(mjdesktopinfo)
        // Laya.stage.addChild(replay)
      } else if (this.button.name == 'btn_leave') {
        Laya.stage.removeChildByName('mjreplay')
        // Laya.stage.removeChildByName('mjdesktopinfo')
        // var hjhd = Laya.stage.getChildByName('mjhandpai') as Laya.Scene
        // hjhd.visible = false
        var mjdesktop3d = Laya.stage.getChildByName('mjdesktop') as Laya.Scene
        mjdesktop3d.destroy()
        Laya.stage.removeChildByName('mjdesktop')

        var paipu = new lobby.PaiPuUI('res/tutorial/outline.json', 'charpter1')

        Laya.stage.addChild(paipu)
      } else if (this.button.name === 'btn_back') {
        Laya.stage.removeChildByName('paipu')
        Laya.stage.addChild(new lobby.LobbyUI())
        var lobbyScene = Laya.stage.getChildByName('lobby') as Laya.Scene
        lobbyScene.visible = true
      } else if (this.button.name === 'tip') {
        let mjreplay = Laya.stage.getChildByName('mjreplay') as lobby.MJReplay
        mjreplay.info_tip.visible = !mjreplay.info_tip.visible
      } else if (this.button.name === 'paishan') {
        let mjreplay = Laya.stage.getChildByName('mjreplay') as lobby.MJReplay
        mjreplay.info_paishan.visible = !mjreplay.info_paishan.visible
      } else if (this.button.name === 'round') {
        let mjreplay = Laya.stage.getChildByName('mjreplay') as lobby.MJReplay
        mjreplay.info_chang.visible = !mjreplay.info_chang.visible
      } else if (this.button.name === 'turn') {
        let mjreplay = Laya.stage.getChildByName('mjreplay') as lobby.MJReplay
        mjreplay.info_xun.visible = !mjreplay.info_xun.visible
      } else {
        console.log(this.button)
      }
    }
  }

  export class LabelLocalizationPosition extends Laya.Button {
    constructor() {
      super()
      this.on(Laya.Event.CLICK, this, this.mouseDown)
    }
    mouseDown() {
      console.log('mouseDown')
    }
  }
  export class LabelLocalizationLine extends Laya.Label {
    constructor() {
      super()
      this.on(Laya.Event.CLICK, this, this.mouseDown)
    }
    mouseDown() {
      console.log('mouseDown')
    }
  }
  export class UICopy extends Laya.Script {
    constructor() {
      super()
    }
  }
  export class CLoading extends Laya.Sprite {
    constructor() {
      super()
    }
  }

  export class CScrollBar_Heng {
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
  export class CDropdown {
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
  export class NoLimitList extends Laya.Sprite {
    constructor() {
      super()
      this.on(Laya.Event.CLICK, this, this.mouseDown)
    }
    mouseDown() {
      console.log('mouseDown')
    }
  }
}
