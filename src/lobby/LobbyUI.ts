module lobby {
  export class LobbyUI extends LobbyScene {
    public illust: Laya.Sprite
    public page0: Laya.Sprite
    public container_pages: Laya.Sprite
    public container_btns: Laya.Sprite
    public container_top: Laya.Sprite
    name: string = 'lobby_ui'
    constructor() {
      super()
      // 左侧 任务 台词
      this.illust = this.getChildByName('illust') as Laya.Sprite
      this.illust.visible = false
      // 段位场 活动场 友人场
      this.page0 = this.getChildByName('page0') as Laya.Sprite
      this.page0.visible = false

      // 下侧切换场景按钮
      this.container_btns = this.getChildByName('container_btns') as Laya.Sprite
      this.container_top = this.getChildByName('container_top') as Laya.Sprite
      this.initContainerPages()
      this.initContainerTop()
    }
    createChildren(): void {
      super.createChildren()
      this.createView(Laya.View.uiMap['lobby/lobby'])
    }
    initContainerPages() {
      // 所有
      this.container_pages = this.getChildByName(
        'container_pages'
      ) as Laya.Sprite
      // 返回
      var container_title = this.container_pages.getChildByName(
        'container_title'
      ) as Laya.Image
      container_title.visible = false
      // 银之间 金之间
      var page_rank = this.container_pages.getChildByName(
        'page_rank'
      ) as Laya.Sprite
      page_rank.visible = false
      // 友人场 详情界面
      var page_friend = this.container_pages.getChildByName(
        'page_friend'
      ) as Laya.Sprite
      page_friend.visible = false
      // 乱斗之间
      var page_match = this.container_pages.getChildByName(
        'page_match'
      ) as Laya.Sprite
      page_match.visible = false
      // 四人东 三人东
      var page_east_north = this.container_pages.getChildByName(
        'page_east_north'
      ) as Laya.Sprite
      page_east_north.visible = false
    }
    initContainerTop() {
      // 成就
      var btn_achievement = this.container_top.getChildByName(
        'btn_achievement'
      ) as Laya.Button
      // 签到 活动
      var btn_sign = this.container_top.getChildByName(
        'btn_sign'
      ) as Laya.Button
      btn_sign.visible = false
      var btn_nianshou = this.container_top.getChildByName(
        'btn_nianshou'
      ) as Laya.Button
      btn_nianshou.visible = false
      var btn_doupai = this.container_top.getChildByName(
        'btn_doupai'
      ) as Laya.Button
      btn_doupai.visible = false
      var btn_chunjie = this.container_top.getChildByName(
        'btn_chunjie'
      ) as Laya.Button
      btn_chunjie.visible = false
      var btn_dongri = this.container_top.getChildByName(
        'btn_dongri'
      ) as Laya.Button
      btn_dongri.visible = false
      var btn_hesu = this.container_top.getChildByName(
        'btn_hesu'
      ) as Laya.Button
      btn_hesu.visible = false
      var btn_kuangdu = this.container_top.getChildByName(
        'btn_kuangdu'
      ) as Laya.Button
      btn_kuangdu.visible = false
      // 新消息进度 活动
      var btn_sns = this.container_top.getChildByName('btn_sns') as Laya.Button
      btn_sns.visible = false
      // 一姬当千 活动
      var btn_rpg = this.container_top.getChildByName('btn_rpg') as Laya.Button
      btn_rpg.visible = false
      // 恋爱之战 活动
      var btn_huiye = this.container_top.getChildByName(
        'btn_huiye'
      ) as Laya.Button
      btn_huiye.visible = false
      // 龙争虎斗 活动
      var btn_ab_match = this.container_top.getChildByName(
        'btn_ab_match'
      ) as Laya.Button
      btn_ab_match.visible = false
    }
  }
}
