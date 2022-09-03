module lobby {
  export class LobbyScene extends Laya.View {
    constructor() {
      super()
    }

    createChildren() {
      Laya.View.regComponent('capsui.CButton', capsui.CButton)
      Laya.View.regComponent('capsui.UICopy', capsui.UICopy)
      Laya.View.regComponent('capsui.CScrollView', capsui.CScrollView)
      Laya.View.regComponent('capsui.CScrollView_Heng', capsui.CScrollView_Heng)
      Laya.View.regComponent('capsui.CDropdown', capsui.CDropdown)
      Laya.View.regComponent('capsui.CScrollBar', capsui.CScrollBar)
      Laya.View.regComponent('capsui.CScrollBar_Heng', capsui.CScrollBar_Heng)
      Laya.View.regComponent('capsui.CLoading', capsui.CLoading)
      Laya.View.regComponent('capsui.NoLimitList', capsui.NoLimitList)
      Laya.View.regComponent(
        'capsui.LabelLocalizationLine',
        capsui.LabelLocalizationLine
      )
      Laya.View.regComponent(
        'capsui.LabelLocalizationPosition',
        capsui.LabelLocalizationPosition
      )
      Laya.View.regComponent(
        'capsui.LabelLocalizationSize',
        capsui.LabelLocalizationSize
      )
      super.createChildren()
    }
  }

  export class TempScene extends LobbyScene {
    constructor() {
      super()
      this.init()
    }
    private init() {}
    createChildren(): void {
      super.createChildren()
      this.createView(Laya.View.uiMap['spot/spot_choose'])
    }
  }
}
