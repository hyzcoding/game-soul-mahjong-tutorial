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
    private other: Other
    private other_sprite: Laya.Sprite3D
    private charpter: JSON
    private x = 0.029754001647233963
    private y = 0.03949800133705139
    private z = 0.019314000383019447
    /**
     * 场风
     */
    private chang_number: number
    private ju_number: number
    /**
     * 余
     */
    private left: Laya.Sprite3D
    private left_number: number
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
    /**
     * 场风 1 2 3 4
     */
    private feng: Laya.Sprite3D[]
    /**
     * 分数 1 2 3 4
     */
    private score: Laya.Sprite3D[]
    /**
     * 立直手位置 1 2 3 4
     */
    private liqi_pos: Laya.Sprite3D[]
    /**
     * 出牌闪烁 1 2 3 4
     */
    private ind: Laya.Sprite3D[]
    /**
     * 分数阴影 1 2 3 4
     */
    private reveal: Laya.Sprite3D[]
    private effect: Laya.Sprite3D
    private mjp_cartoon_material: caps.BaseMaterial
    private mjp_outline_material: caps.Material_Outline
    private effect_map: { [key: string]: Laya.Sprite3D }
    private _scene: Laya.Scene
    constructor(room: Laya.Sprite3D) {
      this.room = room
      this.feng = []
      this.score = []
      this.liqi_pos = []
      this.ind = []
      this.reveal = []

      this.initRes()
      this.other = new Other(
        this.chang_number,
        this.ju_number,
        this.left_number,
        this.other_sprite
      )
      this.initPoss()
      this.loadTutorial()
    }

    /**
     * 四方初始化
     * poss
     * ming_ 鸣牌位置
     * pai_ 手牌
     * hand_ 手部位置
     * man_  庄位 liqi 立直棒区域 "score" 分数 "ind" 出牌闪烁 "dir" 风 "muyu" "reveal" 紫色阴影
     * hai_
     * babei_
     * huansanzhang_
     */
    initPoss() {
      // 当前主视角风 1 东 2 南 3 西 4 北
      var feng_current = 1
      for (let i = 1; i <= 4; i++) {
        var man = this.poss_map[`man_${i}`] as Laya.Sprite3D
        var feng = man.getChildByName('dir') as Laya.MeshSprite3D
        var score = man.getChildByName('score') as Laya.Sprite3D
        var liqi_pos = man.getChildByName('liqi') as Laya.Sprite3D
        var ind = man.getChildByName('ind') as Laya.Sprite3D
        var reveal = man.getChildByName('reveal') as Laya.Sprite3D
        var material = feng.meshRender.material as Laya.BlinnPhongMaterial
        var to = material.tilingOffset.elements
        to[2] = 0.25 * ((feng_current + i - 2) % 4)
        liqi_pos.active = false
        if (i != 1) {
          ind.active = false
        }
        reveal.active = false
        var score_number = this.charpter[`score_${i}`]
        //
        score._childs.forEach((v: Laya.MeshSprite3D, i) => {
          // 2 0 ,3 1,4 2,5 3, 6 4 ,7 5
          if (score_number == 0) {
            v.active = false
          } else {
            var number = score_number % 10
            var material_score = v.meshRender
              .material as Laya.BlinnPhongMaterial
            var to_score = material_score.tilingOffset.elements
            to_score[2] = (number + 2) / 12
            to_score[3] = 0
          }
          score_number = Math.floor(score_number / 10)
        })

        this.feng.push(feng)
        this.score.push(score)
        this.liqi_pos.push(liqi_pos)
        this.ind.push(ind)
        this.reveal.push(reveal)
      }
      var man_1 = this.poss_map['man_1']
      this.poss_map['pai_1'].active = false
      var man_1_score = man_1.getChildByName('score')
      // var main_1_basic = man_1_score.getChildAt(0) as Laya.MeshSprite3D
      // var mat: Laya.BlinnPhongMaterial = Laya.BlinnPhongMaterial.load(
      //   'res/scene/Assets/Resource/table/tablemid/score_reveal.lmat'
      // )
      // main_1_basic.meshRender.material = mat
      // var s = Laya.MeshSprite3D.load(
      //   'myres/mjdesktop/number/at_1.png'
      // ) as Laya.MeshSprite3D
    }
    public initRole() {
      var role3D: Laya.Sprite3D = Laya.loader.getRes('res/scene/hand_human.lh')
      var roleAnimator: Laya.Animator = (
        role3D.getChildByName('hand_human') as Laya.Sprite3D
      ).getComponentByType(Laya.Animator) as Laya.Animator
      //: "LiZhi"  "Dapai" "Fulu" "Zimo" "LiQiPai"
      var fulu: Laya.AnimationClip = roleAnimator.getClip('LiZhi')
      var liqi_default: Laya.MeshSprite3D = Laya.loader.getRes(
        'res/scene/liqi_default.lh'
      )
      var l = role3D
        .getChildByName('hand_human')
        .getChildByName('node_liqibang')
      this.poss_map['man_1'].getChildByName('liqi').addChild(liqi_default)
    }

    public loadTutorial(): void {
      // 循环
      this.poss._childs.forEach((val, idx) => {
        var temp = val as Laya.Sprite3D
        // 最左侧位置
        var position = 0
        // 是否立直
        var lizhi = false
        // 循环单个
        this.charpter['poss'][temp.name].forEach((v: string, i: number) => {
          let sprite = this.initMJPSprite(
            v.replace('$', ''),
            this.mjp_cartoon_material,
            this.mjp_outline_material,
            val
          )
          var directionX: number
          if (val.name.indexOf('pai') != -1 || val.name.indexOf('ming') != -1) {
            directionX = -1
          } else if (val.name.indexOf('hai') != -1) {
            directionX = 1
          }
          var directionY = 0
          var directionZ = 0
          var interval = 0.0015

          var column_number = i
          var row_number = i
          var row_height = this.z
          var x_position = directionX * (this.x + interval) * column_number
          var y_position = directionY * (this.y + interval) * column_number
          var z_position = directionZ * (this.z + interval) * column_number
          if (val.name.indexOf('hai') != -1 || val.name.indexOf('ming') != -1) {
            directionZ = -1
            row_height = this.y + interval
            column_number = column_number % 6
            row_number = Math.floor(row_number / 6)
            var a = this.x + interval
            if (v.indexOf('$') != -1) {
              var left = 2 * interval
              a = this.y - left
              lizhi = true
            } else if (lizhi) {
              position += 3 * interval * directionX
              lizhi = false
            }
            position += a * directionX
            if (column_number == 0 && v.indexOf('$') != -1) {
              position = (this.y - this.x - 3 * interval) * directionX
            } else if (column_number == 0) {
              position = 0
            }
            x_position = position
          }
          z_position = directionZ * row_height * row_number
          sprite.transform.translate(
            new Laya.Vector3(x_position, y_position, z_position)
          )
          if (v.indexOf('$') != -1) {
            sprite.transform.rotate(
              new Laya.Vector3(0, directionX * 90, 0),
              true,
              false
            )
          }
          val.addChild(sprite)
        })
      })
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
      this.other_sprite = this.room.getChildByName('other') as Laya.Sprite3D
      this.mjp_outline_material = this.initMJOutlineMaterial()
      this.mjp_cartoon_material = this.initMJCartoonMaterial()
      this.charpter = Laya.loader.getRes('res/tutorial/charpter1.json')
      this.chang_number = this.charpter['chang']
      this.ju_number = this.charpter['ju']
      this.left_number = this.charpter['left']
      // 场上牌位置
      this.poss = this.room.getChildByName('poss') as Laya.Sprite3D
      this.poss_map = {}
      this.poss._childs.forEach((sprite: Laya.Sprite3D) => {
        if (sprite.getChildByName('maque')) {
          var maque = sprite.getChildByName('maque') as Laya.Sprite3D
          maque.active = false
        }
        this.poss_map[sprite.name] = sprite
      })
      this.other_reveal = this.room.getChildByName(
        'other_reveal'
      ) as Laya.Sprite3D
      var other_reveal_chang = this.other_reveal.getChildByName(
        'chang'
      ) as Laya.Sprite3D
      other_reveal_chang.active = false
      var other_reveal_left = this.other_reveal.getChildByName(
        'left'
      ) as Laya.Sprite3D
      other_reveal_left.active = false
      var other_reveal_score = this.other_reveal.getChildByName(
        'score'
      ) as Laya.Sprite3D
      other_reveal_score.active = false
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
     * @param mj_cartoon_material 麻将反光材质
     * @param parent 父级sprite3D
     * @returns 麻将sprite3D
     */
    public initMJPSprite(
      mjp_name: string,
      mj_cartoon_material: caps.BaseMaterial,
      mj_outline_material: caps.Material_Outline,
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
      mj_cartoon_material.renderQueue = 2000
      mjp_sprite_m.meshRender.sharedMaterial = mj_cartoon_material
      var mjp_sprite_m_outline = this.maque_outline.clone() as Laya.MeshSprite3D
      mjp_sprite_m.addChild(mjp_sprite_m_outline)
      mjp_sprite_m_outline.transform.localPosition = new Laya.Vector3(0, 0, 0)
      mjp_sprite_m_outline.transform.localScale = new Laya.Vector3(1, 1, 1)
      mjp_sprite_m_outline.transform.localRotation = new Laya.Quaternion(
        0,
        0,
        0,
        0
      )

      mj_outline_material.renderQueue = 2999
      mjp_sprite_m_outline.meshRender.sharedMaterial = mj_outline_material
      var mjp_sprite_m_effect = Laya.Sprite3D.instantiate(
        this.effect,
        mjp_sprite_m,
        false,
        new Laya.Vector3(),
        new Laya.Quaternion()
      ) as Laya.MeshSprite3D
      mjp_sprite_m_effect.removeChildren()
      // mjp_sprite_m.addChild(mjp_sprite_m_outline)
      mjp_sprite_m.addChild(mjp_sprite_m_effect)
      mjp_sprite_all.addChild(mjp_sprite_m)
      mjp_sprite.addChild(mjp_sprite_all)
      // effect_shadow
      var mjp_sprite_effect_shadow = Laya.Sprite3D.instantiate(
        this.effect_map['effect_shadow'],
        mjp_sprite
      ) as Laya.MeshSprite3D
      mjp_sprite.addChild(mjp_sprite_effect_shadow)
      // effect_shadow_touming
      var mjp_sprite_effect_shadow_touming = Laya.Sprite3D.instantiate(
        this.effect_map['effect_shadow_touming'],
        mjp_sprite
      ) as Laya.MeshSprite3D
      mjp_sprite.addChild(mjp_sprite_effect_shadow_touming)
      return mjp_sprite
    }
    /**
     * 初始化shader材质
     * @returns 麻将反光材质
     */
    public initMJCartoonMaterial(): caps.BaseMaterial {
      var mj_cartoon_material = new caps.BaseMaterial()
      mj_cartoon_material.setTexture(
        caps.Cartoon.TEXTURE,
        Laya.Texture2D.load('res/scene/mjp_default/mjp.png')
      )
      mj_cartoon_material.setNumber(caps.Cartoon.SPLIT, 0.4),
        mj_cartoon_material.setColor(
          caps.Cartoon.COLOR_LIGHT,
          new Laya.Vector3(1, 1, 1)
        ),
        mj_cartoon_material.setColor(
          caps.Cartoon.COLOR_UNLIGHT,
          new Laya.Vector3(0.788, 0.788, 0.8235)
        ),
        mj_cartoon_material.setColor(
          caps.Cartoon.COLOR,
          new Laya.Vector3(1, 1, 1)
        )

      return mj_cartoon_material
    }
    /**
     * 初始化shader材质
     * @returns 麻将边框材质
     */
    public initMJOutlineMaterial(): caps.Material_Outline {
      var mj_outline_material = new caps.Material_Outline()
      mj_outline_material.renderQueue = 2999
      mj_outline_material.setColor(
        caps.Outline.OUTLINE_COLOR,
        new Laya.Vector3(0.165, 0.192, 0.204)
      )
      mj_outline_material.setNumber(caps.Outline.OUTLINE_ALPHA, 0.6),
        mj_outline_material.setNumber(caps.Outline.OUTLINE, 0.0012)
      mj_outline_material.blend = Laya.BaseMaterial.BLEND_ENABLE_ALL
      mj_outline_material.depthWrite = false
      mj_outline_material.srcBlend = Laya.BaseMaterial.BLENDPARAM_SRC_ALPHA
      mj_outline_material.alphaTest = true
      mj_outline_material.dstBlend =
        Laya.BaseMaterial.BLENDPARAM_ONE_MINUS_SRC_ALPHA
      mj_outline_material.cull = 1
      return mj_outline_material
    }
  }
}
