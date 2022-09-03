module caps {
  export class Cartoon_Alpha {
    private TEXTURE: number = 1
    private COLOR: number = 2
    private ALPHA: number = 3
    private SPLIT: number = 10
    private COLOR_LIGHT: number = 30
    private COLOR_UNLIGHT: number = 31
    initShader(): void {
      var attributeMap = {
        a_BoneIndices: Laya.VertexElementUsage.BLENDINDICES0,
        a_BoneWeights: Laya.VertexElementUsage.BLENDWEIGHT0,
        a_Position: Laya.VertexElementUsage.POSITION0,
        a_Normal: Laya.VertexElementUsage.NORMAL0,
        a_Texcoord: Laya.VertexElementUsage.TEXTURECOORDINATE0,
      }
      var uniformMap = {
        u_Bones: [
          Laya.SkinnedMeshSprite3D.BONES,
          Laya.Shader3D.PERIOD_RENDERELEMENT,
        ],
        u_CameraPos: [Laya.BaseCamera.CAMERAPOS, Laya.Shader3D.PERIOD_CAMERA],
        u_MvpMatrix: [Laya.Sprite3D.MVPMATRIX, Laya.Shader3D.PERIOD_SPRITE],
        u_WorldMat: [Laya.Sprite3D.WORLDMATRIX, Laya.Shader3D.PERIOD_SPRITE],
        u_texture: [this.TEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
        'u_DirectionLight.Direction': [
          Laya.Scene.LIGHTDIRECTION,
          Laya.Shader3D.PERIOD_SCENE,
        ],
        'u_DirectionLight.Diffuse': [
          Laya.Scene.LIGHTDIRCOLOR,
          Laya.Shader3D.PERIOD_SCENE,
        ],
        u_split: [this.SPLIT, Laya.Shader3D.PERIOD_MATERIAL],
        u_color: [this.COLOR, Laya.Shader3D.PERIOD_MATERIAL],
        u_alpha: [this.ALPHA, Laya.Shader3D.PERIOD_MATERIAL],
        u_color_light: [this.COLOR_LIGHT, Laya.Shader3D.PERIOD_MATERIAL],
        u_color_unlight: [this.COLOR_UNLIGHT, Laya.Shader3D.PERIOD_MATERIAL],
      }
      var customShader = Laya.Shader3D.nameKey.add('cartoon')
      var cartoonps = Laya.loader.getRes('res/shader/cartoon/cartoon.ps')
      var cartoonvs = Laya.loader.getRes('res/shader/cartoon/cartoon.vs')
      Laya.ShaderCompile3D.add(
        customShader,
        cartoonvs,
        cartoonps,
        attributeMap,
        uniformMap
      )
    }
  }
}
