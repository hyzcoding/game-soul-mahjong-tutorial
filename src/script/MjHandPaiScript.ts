module script {
  export class MjHandPaiScript extends Laya.Script {
    /*脚本所属的3D对象*/
    private pai: sprite.MJHandSprite
    private isdora: Boolean
    private effect_dora: Laya.Sprite3D
    constructor() {
      super()
    }
    /*3D对象加载组件时的执行方法
                owner加载此组件的3D对象
                */
    public _load(owner: Laya.Sprite3D): void {
      //获取脚本所属对象
      this.pai = owner as sprite.MJHandSprite
      this.isdora = this.pai.isDora
      if (this.isdora) {
        this.effect_dora = this.pai._parent.getChildByName(
          'effect_dora'
        ) as Laya.Sprite3D
        this.effect_dora.active = true
        this.pai.addChild(this.effect_dora)
      }
    }

    public mouseOver(e) {
      console.log('选中')

      this.pai.transform.translate(new Laya.Vector3(0, 10, 0))
    }
    public mouseOut(e) {
      console.log('取消选择')

      this.pai.transform.translate(new Laya.Vector3(0, -10, 0))
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    public _start(state: Laya.RenderState): void {}
    /*覆写组件更新方法（相当于帧循环）
     *state渲染状态
     */
    public _update(state: Laya.RenderState): void {
      // console.log(this.t2d)
      //所属脚本对象旋转更新
      // var material: Laya.StandardMaterial = this.pai.meshRender
      //   .material as Laya.StandardMaterial
      // let sp = Laya.Texture2D.load(
      //   'chs_t/myres2/mjp/mjp_default/ui/9s.png'
      //   // 'chs_t/myres2/mjp/mjp_default/ui/9s.png'
      // ) as Laya.Texture2D
      // material.diffuseTexture = sp
      // this.pai.meshRender.material = material
      // this.pai.transform.rotate(new Laya.Vector3(0, 0.5, 0), false, false)
    }
  }
}
