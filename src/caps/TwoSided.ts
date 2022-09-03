module caps {
  export class TwoSided {
    private TEXTURE: number = 1
    private COLOR: number = 2
    private OFFSET_X: number = 30
    private OFFSET_Y: number = 31
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
        u_color: [this.COLOR, Laya.Shader3D.PERIOD_MATERIAL],
        u_offset_x: [this.OFFSET_X, Laya.Shader3D.PERIOD_MATERIAL],
        u_offset_y: [this.OFFSET_Y, Laya.Shader3D.PERIOD_MATERIAL],
      }
      var customShader = Laya.Shader3D.nameKey.add('twosided')
      var twosidedvs = Laya.loader.getRes('res/shader/twosided/twosided.ps')
      var twosidedps = Laya.loader.getRes('res/shader/twosided/twosided.vs')
      Laya.ShaderCompile3D.add(
        customShader,
        twosidedvs,
        twosidedps,
        attributeMap,
        uniformMap
      )
    }
  }
}
