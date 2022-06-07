module shader {
  export class MJBliinphongShader {
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
      var customShader = Laya.Shader3D.nameKey.add('BLINNPHONG')
      // var blinnphongps: string = Laya.loader.getRes(
      //   'res/shader/cartoon/cartoon.ps'
      // )
      // var blinnphongvs: string = Laya.loader.getRes(
      //   'res/shader/cartoon/cartoon.vs'
      // )
      var outlineps = `#define HIGHPRECISION
      #define DIRECTIONLIGHT
      #define UV
      //#else //#ifdef FSHIGHPRECISION 2
          precision mediump float;
      //#endif
      struct DirectionLight
      {
       vec3 Direction;
       vec3 Diffuse;
      };
      struct PointLight
      {
       vec3 Diffuse;
       vec3 Attenuation;
       vec3 Position;
       float Range;
      };
      struct SpotLight
      {
       vec3 Diffuse;
       vec3 Attenuation;
       vec3 Position;
       vec3 Direction;
       float Spot;
       float Range;
      };
      vec3 NormalSampleToWorldSpace(vec3 normalMapSample, vec3 unitNormal, vec3 tangent)
      {
        vec3 normalT = 2.0*normalMapSample - 1.0;
        
        vec3 N = normalize(unitNormal);
        vec3 T = normalize(tangent- dot(tangent, N)*N);
        vec3 B = cross(T, N);
        mat3 TBN = mat3(T, B, N);
        
        vec3 bumpedNormal = TBN*normalT;
        return bumpedNormal;
      }
      void  computeDirectionLight(in vec3 matDif,in vec3 matAmb,in vec4 matSpe,in DirectionLight dirLight,in vec3 ambinentColor,in vec3 normal,in vec3 toEye,out vec3 dif,out vec3 amb,out vec3 spec)
      {
        dif=vec3(0.0);
        amb=vec3(0.0);
        spec=vec3(0.0);
        vec3 lightVec=-normalize(dirLight.Direction);
        
        amb=matAmb*ambinentColor;
        
        float  diffuseFactor=dot(lightVec, normal);
        
        if(diffuseFactor>0.0)
        {
           vec3 v = reflect(-lightVec, normal);
           float specFactor = pow(max(dot(v, toEye), 0.0), matSpe.w);
           
           dif = diffuseFactor * matDif * dirLight.Diffuse;
           spec = specFactor * matSpe.rgb;
        }
        
      }
      void computePointLight(in vec3 matDif,in vec3 matAmb,in vec4 matSpe,in PointLight poiLight,in vec3 ambinentColor, in vec3 pos,in vec3 normal,in vec3 toEye,out vec3 dif,out vec3 amb,out vec3 spec)
      {
        dif=vec3(0.0);
        amb=vec3(0.0);
        spec=vec3(0.0);
        vec3 lightVec = poiLight.Position - pos;
          
        float d = length(lightVec);
        
        if( d > poiLight.Range )
          return;
          
        lightVec /= d; 
        
        amb = matAmb*ambinentColor;	
        float diffuseFactor = dot(lightVec, normal);
        if( diffuseFactor > 0.0 )
        {
          vec3 v= reflect(-lightVec, normal);
          float specFactor = pow(max(dot(v, toEye), 0.0), matSpe.w);
                
          dif = diffuseFactor * matDif * poiLight.Diffuse;
          spec = specFactor * matSpe.rgb;
        }
        float attenuate = 1.0 / dot(poiLight.Attenuation, vec3(1.0, d, d*d));
        dif *= attenuate;
        spec*= attenuate;
      }
      void ComputeSpotLight(in vec3 matDif,in vec3 matAmb,in vec4 matSpe,in SpotLight spoLight,in vec3 ambinentColor,in vec3 pos, in vec3 normal,in vec3 toEye,out vec3 dif,out vec3 amb,out vec3 spec)
      {
        amb = vec3(0.0);
        dif =vec3(0.0);
        spec= vec3(0.0);
        vec3 lightVec = spoLight.Position - pos;
          
        float d = length(lightVec);
        
        if( d > spoLight.Range)
          return;
          
        lightVec /= d; 
        
        amb = matAmb*ambinentColor;	
        float diffuseFactor = dot(lightVec, normal);
        if(diffuseFactor > 0.0)
        {
          vec3 v= reflect(-lightVec, normal);
          float specFactor = pow(max(dot(v, toEye), 0.0), matSpe.w);
                
          dif = diffuseFactor * matDif * spoLight.Diffuse;
          spec = specFactor * matSpe.rgb;
        }
        
        float spot = pow(max(dot(-lightVec, normalize(spoLight.Direction)), 0.0), spoLight.Spot);
        float attenuate = spot/dot(spoLight.Attenuation, vec3(1.0, d, d*d));
        amb *= spot;
        dif *= attenuate;
        spec*= attenuate;
      }
      varying vec2 v_Texcoord;
      uniform sampler2D u_texture;
      varying vec3 v_Normal;
      uniform float u_split;
      uniform vec3 u_color_light;
      uniform vec3 u_color_unlight;
      uniform vec4 u_color;
      #if defined(DIRECTIONLIGHT)
          varying vec3 v_PositionWorld;
          uniform DirectionLight u_DirectionLight;
      #endif
      void main(){
          vec3 normal=normalize(v_Normal);
          float diffuse = -dot(u_DirectionLight.Direction, v_Normal);
          float d = diffuse - u_split;
          if (diffuse > u_split + 0.1) {
              gl_FragColor = texture2D(u_texture, v_Texcoord) * vec4(u_color_light, 1) * u_color;
          } else if(diffuse > u_split) {
              float a = d * 10.0;
              float b = 1.0 - a;
              gl_FragColor = texture2D(u_texture, v_Texcoord) * u_color * (vec4(u_color_light, 1) * a + vec4(u_color_unlight, 1) * b);
          } else {
              gl_FragColor = texture2D(u_texture, v_Texcoord) * vec4(u_color_unlight, 1) * u_color;
          }
      }`
      var outlinevs = `#define HIGHPRECISION
      #define DIRECTIONLIGHT
      #define UV
      attribute vec4 a_Position;
      attribute vec2 a_Texcoord;
      attribute vec3 a_Normal;
      uniform mat4 u_MvpMatrix;
      uniform mat4 u_WorldMat;
      varying vec2 v_Texcoord;
      varying vec3 v_Normal;
      //#endif
      #if defined(DIRECTIONLIGHT)
          varying vec3 v_PositionWorld;
      #endif
      void main(){
      //    #else //    #ifdef BONE 2
              gl_Position=u_MvpMatrix * a_Position;
              mat3 worldMat=mat3(u_WorldMat);
      //    #endif
              v_Texcoord=a_Texcoord;
              v_Normal=worldMat*a_Normal;
          #if defined(SPOTLIGHT)
      //        #else //        #ifdef BONE 2
                  v_PositionWorld=(u_WorldMat*a_Position).xyz;
      //        #endif
          #endif
      }`
      Laya.ShaderCompile3D.add(
        customShader,
        outlinevs,
        outlineps,
        attributeMap,
        uniformMap
      )
    }
  }
}
