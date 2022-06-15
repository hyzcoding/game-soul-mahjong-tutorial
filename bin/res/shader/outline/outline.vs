#define HIGHPRECISION
#define DIRECTIONLIGHT
#define UV
#define ALPHATEST
attribute vec4 a_Position;
attribute vec2 a_Texcoord;
attribute vec3 a_Normal;
uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;
varying vec2 v_Texcoord;
varying vec3 v_Normal;
uniform float u_outline;
//#endif
#if defined(DIRECTIONLIGHT)
    varying vec3 v_PositionWorld;
#endif
void main(){
    v_Texcoord=a_Texcoord;
//    #else //    #ifdef BONE 2
        vec4 position = a_Position +  vec4(normalize(a_Normal)* u_outline, 0);
        gl_Position=u_MvpMatrix * position; 
        mat3 worldMat=mat3(u_WorldMat);
//    #endif
    v_Normal=worldMat*a_Normal;
    #if defined(DIRECTIONLIGHT)
        v_PositionWorld=(u_WorldMat*position).xyz;
    #endif
}