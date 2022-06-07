// import * as data from './json/example.json'
module mjdesktop {
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
    private _scene: Laya.Scene
    private mjp_blinnphong_material: shader.MJBlinnphongMaterial
    private effect_map: { [key: string]: Laya.Sprite3D }
    constructor(room: Laya.Sprite3D) {
      this.room = room
      this.initRes()
      new shader.MJBliinphongShader().initShader()
      this.mjp_blinnphong_material = this.initMJBlinnphongMaterial()

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
      var man_1 = this.poss_map['man_1']
      this.poss_map['pai_1'].active = false
      var man_1_score = man_1.getChildByName('score')
      var main_1_basic = man_1_score.getChildAt(0) as Laya.MeshSprite3D
      var mat: Laya.BlinnPhongMaterial = Laya.BlinnPhongMaterial.load(
        'res/scene/Assets/Resource/table/tablemid/score_reveal.lmat'
      )
      main_1_basic.meshRender.material = mat
      var s = Laya.MeshSprite3D.load(
        'chs_t/myres/mjdesktop/number/at_1.png'
      ) as Laya.MeshSprite3D
      // score.addChild(s)
      var reveal = man_1.getChildByName('reveal')
      var feng = man_1.getChildByName('dir') as Laya.MeshSprite3D
      // feng.meshRender.material

      var role3D: Laya.Sprite3D = Laya.loader.getRes('res/scene/hand_human.lh')
      var roleAnimator: Laya.Animator = (
        role3D.getChildByName('hand_human') as Laya.Sprite3D
      ).getComponentByType(Laya.Animator) as Laya.Animator
      //: "LiZhi"  "Dapai" "Fulu" "Zimo" "LiQiPai"
      var fulu: Laya.AnimationClip = roleAnimator.getClip('LiZhi')
      var liqi_default: Laya.MeshSprite3D = Laya.loader.getRes(
        'res/scene/liqi_default.lh'
      )

      // var l = role3D
      //   .getChildByName('hand_human')
      //   .getChildByName('node_liqibang')
      // man_1.getChildByName('liqi').addChild(liqi_default)
    }
    /**
     * 资源赋值
     */
    public initRes(): void {
      this._scene = this.room._scene
      this.sun_shine = this.room.getChildByName(
        'sun_shine'
      ) as Laya.ShuriKenParticle3D
      this.container_desktop = this.room.getChildByName(
        'container_desktop'
      ) as Laya.Sprite3D
      this.all = this.room.getChildByName('all') as Laya.Sprite3D
      // 38张麻将牌
      this.mjp = this.all.getChildByName('mjp') as Laya.Sprite3D
      this.mjp_map = {}
      this.mjp._childs.forEach((sprite: Laya.MeshSprite3D) => {
        this.mjp_map[sprite.name] = sprite
      })
      // 麻将线
      this.maque_outline = this.all.getChildByName(
        'maque_outline'
      ) as Laya.MeshSprite3D
      this.touming = this.all.getChildByName('touming') as Laya.Sprite3D
      this.other = this.room.getChildByName('other') as Laya.Sprite3D
      this.chang = this.other.getChildByName('chang') as Laya.Sprite3D
      this.left = this.other.getChildByName('left') as Laya.Sprite3D
      this.poss = this.room.getChildByName('poss') as Laya.Sprite3D
      this.poss_map = {}
      this.poss._childs.forEach((sprite: Laya.Sprite3D) => {
        if (sprite.name.indexOf('pai_') >= 0) {
          var maque = sprite.getChildByName('maque') as Laya.Sprite3D
          maque.active = false
        }
        this.poss_map[sprite.name] = sprite
      })
      this.other_reveal = this.room.getChildByName(
        'other_reveal'
      ) as Laya.Sprite3D
      this.effect = this.room.getChildByName('effect') as Laya.Sprite3D
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

    /**
     * 初始化麻将sprite3D
     * @param mjp_name 麻将名称
     * @param mj_blinnphong_material 麻将反光材质
     * @param parent 父级sprite3D
     * @returns 麻将sprite3D
     */
    public initMJPSprite(
      mjp_name: string,
      mj_blinnphong_material: shader.MJBlinnphongMaterial,
      parent: Laya.Sprite3D
    ): Laya.Sprite3D {
      var maque = parent.getChildByName('maque') as Laya.Sprite3D
      var position = new Laya.Vector3()
      var rotation = maque.transform.localRotation
      var mjp_sprite = new Laya.Sprite3D()
      // 麻将
      var mjp_sprite_all = new Laya.Sprite3D()
      var mjp_sprite_m = Laya.Sprite3D.instantiate(
        this.mjp_map[mjp_name],
        mjp_sprite_all,
        false,
        position,
        rotation
      ) as Laya.MeshSprite3D
      var mjp_sprite_m_outline = Laya.Sprite3D.instantiate(
        this.maque_outline,
        mjp_sprite_m,
        false,
        new Laya.Vector3(),
        new Laya.Quaternion()
      )
      var mjp_sprite_m_effect = Laya.Sprite3D.instantiate(
        this.effect,
        mjp_sprite_m,
        false,
        new Laya.Vector3(),
        new Laya.Quaternion()
      )
      mjp_sprite_m.addChild(mjp_sprite_m_outline)
      mjp_sprite_m.addChild(mjp_sprite_m_effect)
      mjp_sprite_m.meshRender.material = mj_blinnphong_material
      mjp_sprite_all.addChild(mjp_sprite_m)
      mjp_sprite.addChild(mjp_sprite_all)
      // effect_shadow
      var mjp_sprite_effect_shadow = Laya.Sprite3D.instantiate(
        this.effect_map['effect_shadow'],
        mjp_sprite
      )
      mjp_sprite.addChild(mjp_sprite_effect_shadow)
      // effect_shadow_touming
      var mjp_sprite_effect_shadow_touming = Laya.Sprite3D.instantiate(
        this.effect_map['effect_shadow_touming'],
        mjp_sprite
      )
      mjp_sprite.addChild(mjp_sprite_effect_shadow_touming)
      return mjp_sprite
    }
    /**
     * 初始化shader材质
     * @returns 麻将反光材质
     */
    public initMJBlinnphongMaterial(): shader.MJBlinnphongMaterial {
      var mj_blinnphong_material = new shader.MJBlinnphongMaterial()
      mj_blinnphong_material.setTexture(
        1,
        Laya.Texture2D.load('res/scene/mjp_default/mjp.png')
      )
      mj_blinnphong_material.setVector2(2, new Laya.Vector4(1, 1, 1, 1))
      mj_blinnphong_material.setNumber(10, 0.4)
      mj_blinnphong_material.setVector2(30, new Laya.Vector3(1, 1, 1))
      mj_blinnphong_material.setVector2(
        31,
        new Laya.Vector3(
          0.7879999876022339,
          0.7879999876022339,
          0.8234999775886536
        )
      )
      return mj_blinnphong_material
    }
  }
}
