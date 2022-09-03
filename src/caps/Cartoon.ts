module caps {
  export class Cartoon {
    public static TEXTURE: number = 1
    public static COLOR: number = 2
    public static ALPHA: number = 3
    public static SPLIT: number = 10
    public static COLOR_LIGHT: number = 30
    public static COLOR_UNLIGHT: number = 31
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
        u_texture: [caps.Cartoon.TEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
        'u_DirectionLight.Direction': [
          Laya.Scene.LIGHTDIRECTION,
          Laya.Shader3D.PERIOD_SCENE,
        ],
        'u_DirectionLight.Diffuse': [
          Laya.Scene.LIGHTDIRCOLOR,
          Laya.Shader3D.PERIOD_SCENE,
        ],
        u_split: [caps.Cartoon.SPLIT, Laya.Shader3D.PERIOD_MATERIAL],
        u_color: [caps.Cartoon.COLOR, Laya.Shader3D.PERIOD_MATERIAL],
        u_alpha: [caps.Cartoon.ALPHA, Laya.Shader3D.PERIOD_MATERIAL],
        u_color_light: [
          caps.Cartoon.COLOR_LIGHT,
          Laya.Shader3D.PERIOD_MATERIAL,
        ],
        u_color_unlight: [
          caps.Cartoon.COLOR_UNLIGHT,
          Laya.Shader3D.PERIOD_MATERIAL,
        ],
      }
      var customShader = Laya.Shader3D.nameKey.add('cartoon')
      var cartoonps = Laya.loader.getRes('res/shader/cartoon/cartoon.ps')
      var cartoonvs = Laya.loader.getRes('res/shader/cartoon/cartoon.vs')
      Laya.ShaderCompile3D.add(
        customShader,
        this.filterString(cartoonvs),
        this.filterString(cartoonps),
        attributeMap,
        uniformMap
      )
    }
    filterString(Q: string) {
      for (var G = '', D = 0; D < Q.length; ) {
        var W = Q.indexOf('\r', D)
        if (-1 == W) {
          G += Q.substring(D, Q.length)
          break
        }
        W > D && (G += Q.substring(D, W)), (D = W + 1)
      }
      return G
    }
  }
}
