module script {
  export class MjPaiControlScript extends Laya.Script {
    public anim: number = 0
    public anim_life_time: number = 0
    public anim_start_time: number = 0
    public bedraged: boolean = false // 是否被拖拽
    public huansanzhangEnabled: boolean = true
    public index: number = 0
    public isDora: boolean = false
    public isGap: boolean = false
    public is_open: boolean = false
    public ispaopai: boolean = false
    public pos_x: number = 7.6499999999999995
    public started: boolean = true
    public z: number = -0.06
    public hand // 自行添加
    private e
    private t
    private _clickeffect
    private _recommendeffect
    public mySelf: Laya.MeshSprite3D // owner
    public orgin_mat // 原始素材
    // private mjp: Laya.Image
    constructor() {
      super()
      // this.mjp = mjp
    }
    _load(owner: laya.d3.core.ComponentNode): void {
      this.mySelf = owner as Laya.MeshSprite3D
    }
    public Cmp() {}
    AddClickEffect(t) {
      this.t = t
      null != this._clickeffect &&
        (this._clickeffect.destroy(), (this._clickeffect = null)),
        this.mySelf.addChild(t),
        (this._clickeffect = t),
        (t.transform.localPosition = new Laya.Vector3(0, 0, 2)),
        (t.active = !0),
        Laya.timer.once(300, this, this.RemoveClickEffect)
    }
    AddRecommendTag() {
      if (null == this._recommendeffect) {
        var e = this.t.DesktopMgr.Inst.effect_recommend.clone()
        ;(this._recommendeffect = e),
          this.mySelf.addChild(e),
          (e.transform.localPosition = new Laya.Vector3(0, 0, 0)),
          (e.transform.localScale = new Laya.Vector3(1, 1, 1)),
          (e.transform.localRotationEuler = new Laya.Vector3(0, 0, 0)),
          (e.active = !0)
      }
    }
    AnimHuanSanZhang() {
      this.anim = this.e.huansanzhang
      this.anim_start_time = Laya.timer.currTimer
      this.anim_life_time = 800
      var t = this.mySelf.transform.localPosition.clone()
      ;(t.y = 0.8), (this.mySelf.transform.localPosition = t)
    }
    AnimNewTile() {
      var t = this.mySelf.meshRender.material,
        i = t.albedoColor.clone()
      ;(i.w = 0),
        (t.albedoColor = i),
        (this.anim = this.e.newtile),
        (this.anim_start_time = Laya.timer.currTimer),
        (this.anim_life_time = 200)
    }
    ChiTiSelect() {
      // 吃提醒
      for (var e = 0; e < this.hand.length; e++)
        this.hand[e].ChiTiSelect(this.t)
    }
    HuanSanZhangSelect() {}
    Hule() {}
    LiqiSelect() {}
    OnChoosedPai() {}
    RefreshDora() {}
    RemoveClickEffect() {}
    Reset() {}
    SelectEnd() {}
    SetHuanSanZhangEnable() {}
    SetIndex() {}
    SetVal() {}
    Update() {}
    _SetColor() {}
  }
}
