#define HIGHPRECISION
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
}