module caps {
  export class Outline {
    public static OUTLINE: number = 1
    public static OUTLINE_COLOR: number = 2
    public static OUTLINE_ALPHA: number = 3
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
        'u_SpotLight.Position': [
          Laya.Scene.SPOTLIGHTPOS,
          Laya.Shader3D.PERIOD_SCENE,
        ],
        'u_DirectionLight.Diffuse': [
          Laya.Scene.LIGHTDIRCOLOR,
          Laya.Shader3D.PERIOD_SCENE,
        ],
        u_outline: [caps.Outline.OUTLINE, Laya.Shader3D.PERIOD_MATERIAL],
        u_outline_color: [
          caps.Outline.OUTLINE_COLOR,
          Laya.Shader3D.PERIOD_MATERIAL,
        ],
        u_outline_alpha: [
          caps.Outline.OUTLINE_ALPHA,
          Laya.Shader3D.PERIOD_MATERIAL,
        ],
      }
      var customShader = Laya.Shader3D.nameKey.add('outline')
      var outlineps = Laya.loader.getRes(
        'res/shader/outline/outline1.ps'
      ) as string
      var outlinevs = Laya.loader.getRes(
        'res/shader/outline/outline1.vs'
      ) as string
      Laya.ShaderCompile3D.add(
        customShader,
        this.filterString(outlinevs),
        this.filterString(outlineps),
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
