module shader {
  export class MJOutlineShader {
    private OUTLINE: number = 1
    private OUTLINE_COLOR: number = 2
    private OUTLINE_ALPHA: number = 3
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
        u_outline: [this.OUTLINE, Laya.Shader3D.PERIOD_MATERIAL],
        u_outline_color: [this.OUTLINE_COLOR, Laya.Shader3D.PERIOD_MATERIAL],
        u_outline_alpha: [this.OUTLINE_ALPHA, Laya.Shader3D.PERIOD_MATERIAL],
      }
      var customShader = Laya.Shader3D.nameKey.add('outline')
      var outlineps = Laya.loader.getRes('res/shader/outline/outline.ps')
      var outlinevs = Laya.loader.getRes('res/shader/outline/outline.vs')
      var outlineps1 = Laya.loader.getRes('res/shader/outline/outline1.ps')
      var outlinevs1 = Laya.loader.getRes('res/shader/outline/outline1.vs')
      Laya.ShaderCompile3D.add(
        customShader,
        outlinevs,
        outlineps,
        attributeMap,
        uniformMap
      )
      Laya.ShaderCompile3D.add(
        customShader,
        outlinevs1,
        outlineps1,
        attributeMap,
        uniformMap
      )
    }
  }
}
