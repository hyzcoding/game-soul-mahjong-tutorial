module desktop {
  export class Room {
    private room: Laya.Sprite3D
    private sun_shine: Laya.ShuriKenParticle3D
    private container_desktop: Laya.Sprite3D
    private all: Laya.Sprite3D
    private mjp: Laya.Sprite3D
    private mjp_map: { [key: string]: Laya.MeshSprite3D }
    private maque_outline: Laya.MeshSprite3D
    private touming: Laya.Sprite3D
    private other: Laya.Sprite3D
    /**
     * 场风
     */
    private chang: Laya.Sprite3D
    /**
     * 余
     */
    private left: Laya.Sprite3D
    /**
     * 透明牌相关 显示位置
     */
    private poss: Laya.Sprite3D
    /**
     * 位置 map
     */
    private poss_map: { [key: string]: Laya.Sprite3D }
    /**
     * 分数等
     */
    private other_reveal: Laya.Sprite3D
    private effect: Laya.Sprite3D
    private effect_map: { [key: string]: Laya.Sprite3D }
    constructor(room: Laya.Sprite3D) {
      this.room = room
      this.sun_shine = room.getChildByName(
        'sun_shine'
      ) as Laya.ShuriKenParticle3D
      this.container_desktop = room.getChildByName(
        'container_desktop'
      ) as Laya.Sprite3D
      this.all = room.getChildByName('all') as Laya.Sprite3D
      this.mjp = this.all.getChildByName('mjp') as Laya.Sprite3D
      this.mjp_map = {}
      this.mjp._childs.forEach((sprite: Laya.MeshSprite3D) => {
        this.mjp_map[sprite.name] = sprite
      })
      this.maque_outline = this.all.getChildByName(
        'maque_outline'
      ) as Laya.MeshSprite3D
      this.touming = this.all.getChildByName('touming') as Laya.Sprite3D
      this.other = room.getChildByName('other') as Laya.Sprite3D
      this.chang = this.other.getChildByName('chang') as Laya.Sprite3D
      this.left = this.other.getChildByName('left') as Laya.Sprite3D
      this.poss = room.getChildByName('poss') as Laya.Sprite3D
      this.poss_map = {}
      this.poss._childs.forEach((sprite: Laya.Sprite3D) => {
        this.poss_map[sprite.name] = sprite
      })
      /**
       * poss
       * ming_ 鸣牌位置
       * pai_ 手牌
       * hand_ 手部位置
       * man_  庄位 liqi 立直棒区域 "score" 分数 "ind" 出牌闪烁 "dir" 风 "muyu" "reveal" 紫色阴影
       * hai_
       * babei_
       * huansanzhang_
       */
      this.poss.removeChildren()
      var man_1 = this.poss_map['man_1']
      var man_1_score = man_1.getChildByName('score')
      var main_1_basic = man_1_score.getChildAt(0) as Laya.MeshSprite3D
      var mat: Laya.BlinnPhongMaterial = Laya.BlinnPhongMaterial.load(
        'res/scene/Assets/Resource/table/tablemid/score_reveal.lmat'
      )
      main_1_basic.meshRender.material = mat
      // score.removeChildren()
      // score.addChild(basic)
      var s = Laya.MeshSprite3D.load(
        'chs_t/myres/mjdesktop/number/at_1.png'
      ) as Laya.MeshSprite3D
      // score.addChild(s)
      var reveal = man_1.getChildByName('reveal')
      var feng = man_1.getChildByName('dir') as Laya.MeshSprite3D
      feng.meshRender.material

      var role3D: Laya.Sprite3D = Laya.loader.getRes('res/scene/hand_human.lh')
      var roleAnimator: Laya.Animator = (
        role3D.getChildByName('hand_human') as Laya.Sprite3D
      ).getComponentByType(Laya.Animator) as Laya.Animator
      //: "LiZhi"  "Dapai" "Fulu" "Zimo" "LiQiPai"
      var fulu: Laya.AnimationClip = roleAnimator.getClip('LiZhi')
      // console.log(roleAnimator.clip)
      // roleAnimator.clip = fulu
      var liqi_default: Laya.MeshSprite3D = Laya.loader.getRes(
        'res/scene/liqi_default.lh'
      )

      var l = role3D
        .getChildByName('hand_human')
        .getChildByName('node_liqibang')
      l.removeChildren()
      man_1.getChildByName('liqi').addChild(liqi_default)
      // l.addChild(liqi_default)
      // this.poss_map['hand_2'].addChild(role3D)
      // this.poss.addChild(role3D)
      // this.poss.addChild(this.poss_map['hand_2'])
      this.other_reveal = this.room.getChildByName(
        'other_reveal'
      ) as Laya.Sprite3D
      this.room.removeChildByName('other_reveal')
      this.effect = room.getChildByName('effect') as Laya.Sprite3D
      this.effect_map = {}
      this.effect_map['effect_shadow'] = this.effect.getChildByName(
        'effect_shadow'
      ) as Laya.Sprite3D
      this.effect_map['effect_dora'] = this.effect.getChildByName(
        'effect_dora'
      ) as Laya.Sprite3D
      this.effect_map['effect_shadow_touming'] = this.effect.getChildByName(
        'effect_shadow_touming'
      ) as Laya.Sprite3D
      this.effect_map['effect_touming_dora'] = this.effect.getChildByName(
        'effect_touming_dora'
      ) as Laya.Sprite3D
    }
  }
}
