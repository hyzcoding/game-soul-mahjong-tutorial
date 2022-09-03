module lobby {
  export class PaiPuUI extends LobbyScene {
    name: string = 'paipu'
    public top_sp: Laya.Sprite
    public scrollview_sp: Laya.Sprite
    public pop_otherpaipu_sp: Laya.Sprite
    public pop_collect_sp: Laya.Sprite
    public content: Laya.List
    public datasource: any
    public page: number
    public page_max: number
    public json: JSON
    public active_tab: string
    public check_pre: Laya.Sprite
    public check_next: Laya.Sprite
    public tabs: Laya.Sprite
    public noinfo: Laya.Sprite
    constructor(resource: string, charpter: string) {
      super()
      this.initBack()
      this.initOther()
      Laya.loader.load(
        resource,
        Laya.Handler.create(this, () => {
          this.json = Laya.loader.getRes(resource) as JSON
          this.page_max = Object.keys(this.json['tabs']).length
          this.page = 1
          this.check_pre.visible = false
          if (this.page == this.page_max) {
            this.check_next.visible = false
          }
          var tabs = this.json['tabs']['page1'] as Array<string>
          this.initTabs(tabs)
          var arr = this.json[charpter] as Array<any>
          this.initContent(arr)
        })
      )
    }
    changePagePre() {
      this.page -= 1
      var tabs = this.json['tabs'][`page${this.page}`] as Array<any>
      this.initTabs(tabs)
      var arr = this.json[tabs[0].name] as Array<any>
      this.initContent(arr)
      this.check_next.visible = true
      if (this.page == 1) {
        this.check_pre.visible = false
      }
    }
    changePageNext() {
      this.page += 1
      var tabs = this.json['tabs'][`page${this.page}`] as Array<any>
      this.initTabs(tabs)
      var arr = this.json[tabs[0].name] as Array<any>
      this.initContent(arr)
      this.check_pre.visible = true
      if (this.page == this.page_max) {
        this.check_next.visible = false
      }
    }
    tabChange(name: string) {
      var btn: Laya.Button
      if (this.active_tab) {
        btn = this.tabs.getChildByName(this.active_tab) as Laya.Button
      } else {
        btn = this.tabs.getChildAt(0) as Laya.Button
      }
      var img = btn.getChildByName('img') as Laya.Image
      img.skin = 'myres/shop/tab_unchoose.png'
      var lable_before = btn.getChildByName('label_name') as Laya.Label
      lable_before.color = '#8cb65f'
      var active_btn = this.tabs.getChildByName(name)
      var img_label = active_btn.getChildByName('img') as Laya.Image
      img_label.skin = 'myres/shop/tab_choose.png'
      var label_active = active_btn.getChildByName('label_name') as Laya.Label
      label_active.color = '#ffd35c'
      this.content.array = Laya.loader.getRes('res/tutorial/outline.json')[name]
      if (this.content.array.length == 0) {
        this.noinfo.visible = true
      } else {
        this.noinfo.visible = false
      }
      this.active_tab = name
    }
    initTabs(arr: Array<any>) {
      this.tabs = this.scrollview_sp.getChildByName('tabs') as Laya.Sprite
      if (this.tabs.numChildren > 0 && arr.length > 0) {
        this.active_tab = arr[0].name
      }
      for (let index = 0; index < this.tabs.numChildren; index++) {
        let element = this.tabs.getChildAt(index) as Laya.Button
        if (arr[index]) {
          element.name = arr[index].name
          let label = element.getChildByName('label_name') as Laya.Label
          label.text = arr[index].text
          var img_label = element.getChildByName('img') as Laya.Image
          if (index == 0) {
            label.color = '#ffd35c'
            img_label.skin = 'myres/shop/tab_choose.png'
          } else {
            label.color = '#8cb65f'
            img_label.skin = 'myres/shop/tab_unchoose.png'
          }
          element.visible = true
        } else {
          element.visible = false
        }
      }
    }
    /**
     * 渲染返回键
     */
    initBack() {
      // 牌谱返回键
      this.top_sp = this.getChildByName('top') as Laya.Sprite
      this.scrollview_sp = this.getChildByName('scrollview') as Laya.Sprite
      var loading = this.scrollview_sp.getChildByName('loading') as Laya.Sprite
      loading.visible = false
      var scrollbar = this.scrollview_sp.getChildByName(
        'scrollbar'
      ) as Laya.VScrollBar
      // scrollbar.visible = false
    }
    /**
     * 渲染列表
     */
    initContent(arr: Array<any>) {
      if (arr && arr.length > 0) {
        this.noinfo.visible = false
        // 所有牌谱列表
        this.content = this.scrollview_sp.getChildByName('content') as Laya.List
        //list赋值，先获得一个数据源数组
        this.content.array = arr
        this.content.renderHandler = Laya.Handler.create(
          this,
          this.onListRender,
          null,
          false
        )
      } else {
        this.noinfo.visible = true
        this.content.array = []
      }
    }
    onListRender(cell: Laya.Box, index: number): void {
      this.datasource = cell.dataSource
      var date = cell.getChildByName('date') as Laya.Label
      date.text = this.datasource.date
      var room = cell.getChildByName('room') as Laya.Label
      room.text = this.datasource.room
    }
    initTemplate() {
      var templete = null
      // 某个牌谱
      // var templete = content.getChildByName('templete') as Laya.Sprite
      // 背景
      var bg = templete.getChildByName('bg') as Laya.Image
      // 1234 位
      var p0 = templete.getChildByName('p0') as Laya.Sprite
      var p1 = templete.getChildByName('p1') as Laya.Sprite
      var p2 = templete.getChildByName('p2') as Laya.Sprite
      var p3 = templete.getChildByName('p3') as Laya.Sprite
      var date = templete.getChildByName('date') as Laya.Label
      // date.text = '2022/07/02'
      var room = templete.getChildByName('room') as Laya.Label
      // room.text = '金之间'
      // 查看键
      var check = templete.getChildByName('check') as Laya.Button
      // 分享键
      var share = templete.getChildByName('share') as Laya.Button
      // 收藏键
      var collect = templete.getChildByName('collect') as Laya.Button
      // 输入框
      var input = templete.getChildByName('input') as Laya.Image
      // input.visible = false
      var remarks_info = templete.getChildByName('remarks_info') as Laya.Label
      // remarks_info.text = '牌谱名称'
      var btn_input = templete.getChildByName('btn_input') as Laya.Button
      // btn_input.visible = false
    }
    initOther() {
      // 其他牌谱
      this.check_pre = this.scrollview_sp.getChildByName(
        'check_pre'
      ) as Laya.Sprite
      this.check_next = this.scrollview_sp.getChildByName(
        'check_next'
      ) as Laya.Sprite
      // 收藏上限
      var collect_limit = this.scrollview_sp.getChildByName(
        'collect_limit'
      ) as Laya.Sprite
      collect_limit.visible = false
      // 暂无
      this.noinfo = this.scrollview_sp.getChildByName('noinfo') as Laya.Sprite
      this.noinfo.visible = false
      // 其他牌谱弹窗 评论
      this.pop_otherpaipu_sp = this.getChildByName(
        'pop_otherpaipu'
      ) as Laya.Sprite
      this.pop_otherpaipu_sp.visible = false
      // 牌谱搜索弹窗
      this.pop_collect_sp = this.getChildByName('pop_collect') as Laya.Sprite
      this.pop_collect_sp.visible = false
    }
    createChildren(): void {
      super.createChildren()
      this.createView(Laya.View.uiMap['lobby/paipu'])
    }
  }
}
