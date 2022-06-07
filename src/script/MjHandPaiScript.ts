module script {
  export class MjHandPaiScript extends Laya.Script {
    /*脚本所属的3D对象*/
    private pai: Laya.MeshSprite3D
    private t2d: Laya.Texture2D
    constructor() {
      super()
    }
    /*3D对象加载组件时的执行方法
                owner加载此组件的3D对象
                */
    public _load(owner: Laya.Sprite3D): void {
      //获取脚本所属对象
      this.pai = owner as Laya.MeshSprite3D
    }
    /*覆写组件所属3D对象实例化完成后，第一次更新时的执行方法*/
    public _start(state: Laya.RenderState): void {
      //获取模型上的材质
      // this.pai.meshFilter.sharedMesh = Laya.Mesh.load("res/scene/Assets/Resource/mjpai/mjp-001.lm")

      var material: Laya.BlinnPhongMaterial = this.pai.meshRender
        .material as Laya.BlinnPhongMaterial
      // console.log(mat)
      // var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial()
      // console.log(this.pai.meshRender.material)
      // var material: Laya.BlinnPhongMaterial = Laya.BlinnPhongMaterial.load(
      //   'res/scene/Assets/Resource/mjpai/mjp.lmat'
      // )

      // console.log(material)

      // console.log(material)
      this.t2d = Laya.Texture2D.load(
        'res/scene/mjp_default/mjp.png'
      ) as Laya.Texture2D
      console.log(this.t2d)

      // var t2d = Laya.loader.getRes(
      //   'res/scene/Asset/Resource/mjpai/mjp_default/hand_ui.png'
      // ) as Laya.Texture2D
      // var t2d = t.bitmap as Laya.Texture2D
      // var t2d=new Laya.Texture2D(t.width,t.height,Laya.TextureFor)
      // material.albedoTexture = this.t2d
      // console.log(material.albedoTexture)
      // var texture = material.albedoTexture as Laya.Texture2D
      // var material = this.pai.meshRender.material as Laya.BlinnPhongMaterial
      // material.albedoTexture = t2d
      // this.pai.meshRender.material = material
      // mat.albedoTexture = t2d
      //material.albedoTexture = sp.
      // // //修改材质的反射率颜色，让模型偏红
      // material.albedo = new Laya.Vector4(1, 0, 0, 1);
    }
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
