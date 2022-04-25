// import MjPaiControlScript = script.MjPaiControlScript
module ui {
  export class UI {
    private ui_scene: Laya.Image
    private ui_images: { [key: string]: Laya.Image }
    private ui_image_prefix: string = 'chs_t/myres/mjdesktop/'
    private png_suffix = '.png'
    private mjdesktop_atlas_frames: Array<string>
    constructor(resources: Array<any>) {
      this.mjdesktop_atlas_frames = [
        'OB_icon',
        'al',
        'at_plus',
        'b_emj',
        'b_set',
        'baopai',
        'ben_jiaochen',
        'ben_shezhi',
        'bg_3',
        'bg_4',
        'bg_center_fan',
        'bg_chat_content',
        'bg_chipeng_back',
        'bg_chipengchoose',
        'bg_chipengchoose_title',
        'bg_dora',
        'bg_end',
        'bg_end0',
        'bg_end123',
        'bg_fan',
        'bg_fan1',
        'bg_head',
        'bg_jiesuan',
        'bg_jiesuan_mask',
        'bg_lidora',
        'bg_name',
        'bg_nickname',
        'bg_point',
        'bg_type',
        'bg_yakuman',
        'box_bg',
        'box_bg1',
        'box_exp',
        'box_exp_bg',
        'btn_collect_d',
        'btn_collect_l',
        'btn_exit',
        'btn_round',
        'chat',
        'chat_btn',
        'chat_lock',
        'chat_mask',
        'checkinfo',
        'choosed',
        'confirm',
        'confirm_countdown',
        'cutin_line',
        'cutinbg',
        'dingque_0',
        'dingque_0_d',
        'dingque_1',
        'dingque_1_d',
        'dingque_2',
        'dingque_2_d',
        'dingque_recommend',
        'dingque_select',
        'exp_line',
        'expbar',
        'expbar_base',
        'expbar_base2',
        'expbar_full',
        'fanfu',
        'fastforward',
        'final',
        'forward',
        'func_arrow',
        'func_btn',
        'gamestop',
        'headmask',
        'hint',
        'huangpailiuju',
        'jiuzhongjiupai',
        'left_top',
        'left_top1',
        'lightning',
        'line',
        'mute',
        'mute_on',
        'muyu',
        'muyu_seat0',
        'muyu_seat1',
        'muyu_seat2',
        'muyu_seat3',
        'myself',
        'next',
        'nofan',
        'noting',
        'op_anpai',
        'op_anpailiqi',
        'op_babei',
        'op_chi',
        'op_confirm',
        'op_gang',
        'op_hu',
        'op_kaipai',
        'op_liuju',
        'op_lizhi',
        'op_peng',
        'op_suoding',
        'op_x',
        'op_zimo',
        'open_arrow',
        'pai_shadow',
        'pause',
        'pg_he',
        'pg_zimo',
        'play',
        'point_bg',
        'rank_down',
        'rank_down_arrow',
        'replaybox',
        'round_bg',
        'rpg_bg',
        'rpg_head',
        'rpg_head_d',
        'rpg_order_attack',
        'rpg_order_defence',
        's_1',
        's_1_1',
        's_2',
        's_2_2',
        's_3',
        's_3_3',
        's_4',
        's_4_4',
        'sanjiahule',
        'scorechange_bg',
        'scorechangearrow_0',
        'scorechangearrow_0_l',
        'scorechangearrow_1',
        'scorechangearrow_1_l',
        'shou_maskdown',
        'shou_maskright',
        'shout_anpai',
        'shout_anpailizhi',
        'shout_babei',
        'shout_chi',
        'shout_gang',
        'shout_horizontal',
        'shout_kaipai',
        'shout_lizhi',
        'shout_maskup',
        'shout_peng',
        'shout_score_1',
        'shout_score_2',
        'shout_suoding',
        'shout_vertical',
        'show_rong',
        'show_tingpai',
        'show_zimo',
        'sifenglianda',
        'sigangsanle',
        'signal_bad',
        'signal_good',
        'signal_normal',
        'sijializhi',
        'star_down',
        'star_down_arrow',
        'star_upgrade',
        'start_down',
        'start_left',
        'start_right',
        'start_up',
        'stop',
        'tag_jjc',
        'tag_jjc_d',
        'tag_jjc_l',
        'tingpaijiesuan',
        'tou_dora_back',
        'unchoosed',
        'upgrade',
        'upgrade_arrow',
        'vline',
        'vote_agree',
        'vote_default',
        'vote_disagree',
        'vote_pbar',
        'vote_pbg',
        'w_0',
        'w_1',
        'w_2',
        'w_3',
        'w_4',
        'w_5',
        'w_6',
        'w_7',
        'w_8',
        'w_9',
        'weitingfangang',
        'winlose',
        'word_fan',
        'word_fu',
        'word_point',
        'word_yiman',
      ]

      //Laya.loader.create(resources, Laya.Handler.create(this, this.handler))
    }

    private handler() {
      this.initUI()
    }

    private initUI() {
      var config = ui.ui_config
      this.ui_images = {}
      var keys = Object.keys(config)
      this.ui_scene = new Laya.Image()
      keys.forEach((frame) => {
        this.ui_images[frame] = new Laya.Image()
        this.ui_images[frame].skin = this.ui_image_prefix
          .concat(frame)
          .concat(this.png_suffix)
        this.ui_images[frame].x = config[frame].x
        this.ui_images[frame].y = config[frame].y
        this.ui_scene.addChild(this.ui_images[frame])
      })

      Laya.stage.addChild(this.ui_scene)
    }
    public getScene(): Laya.Image {
      return this.ui_scene
    }
  }
}
