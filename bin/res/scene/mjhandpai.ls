{"type":"Scene","props":{"name":"mjhandpai","enableFog":false,"fogStart":0,"fogRange":300},"customProps":{"skyBox":{},"lightmaps":[],"ambientColor":[1,1,1],"fogColor":[0.5,0.5,0.5]},"child":[{"type":"Camera","props":{"isStatic":false,"name":"camera","clearFlag":2,"orthographic":true,"orthographicVerticalSize":18,"nearPlane":0.3,"farPlane":100},"customProps":{"layer":0,"translate":[0,0,-30],"rotation":[0,1,0,0],"scale":[1,1,1],"viewport":[0,0,1,1],"clearColor":[0.1921569,0.3019608,0.4745098,0]},"components":{},"child":[]},{"type":"Sprite3D","props":{"isStatic":false,"name":"root"},"customProps":{"layer":0,"translate":[-42.01,2.97,0],"rotation":[0,1,0,0],"scale":[1,1,1]},"components":{},"child":[{"type":"Sprite3D","props":{"isStatic":false,"name":"hands"},"customProps":{"layer":0,"translate":[-53.53,-10.58,0],"rotation":[0,0,0,-1],"scale":[0.62,1,1]},"components":{},"child":[{"type":"MeshSprite3D","props":{"isStatic":false,"name":"pai"},"customProps":{"layer":0,"translate":[0,-0.06,0],"rotation":[0,0,0,-1],"scale":[1,1,1],"meshPath":"Assets/Resource/effect/mesh/plane1X1-Plane01.lm","materials":[{"type":"Laya.BlinnPhongMaterial","path":"Assets/Resource/mjpai/mjphand.lmat"}]},"components":{"BoxCollider":{"isTrigger":false,"center":[0,-1.13,0],"size":[2.54,4.76,1]}},"child":[]},{"type":"Sprite3D","props":{"isStatic":false,"name":"effect_dianji"},"customProps":{"layer":0,"translate":[0,1000,0],"rotation":[0,0,0,-1],"scale":[1,1,1]},"components":{},"child":[{"type":"ShuriKenParticle3D","props":{"isStatic":false,"name":"gaoliang"},"customProps":{"layer":0,"translate":[0,0,0.2],"rotation":[0,1,0,0],"scale":[1,1,1],"isPerformanceMode":true,"duration":5,"looping":false,"prewarm":false,"startDelayType":0,"startDelay":0,"startDelayMin":0,"startDelayMax":0,"startLifetimeType":0,"startLifetimeConstant":0.2,"startLifetimeConstantMin":0,"startLifetimeConstantMax":0.2,"startLifetimeGradient":{"startLifetimes":[]},"startLifetimeGradientMin":{"startLifetimes":[]},"startLifetimeGradientMax":{"startLifetimes":[]},"startSpeedType":0,"startSpeedConstant":0,"startSpeedConstantMin":0,"startSpeedConstantMax":0,"threeDStartSize":false,"startSizeType":0,"startSizeConstant":1.1,"startSizeConstantMin":0,"startSizeConstantMax":1.1,"startSizeConstantSeparate":[1.1,1,1],"startSizeConstantMinSeparate":[0,0,0],"startSizeConstantMaxSeparate":[1.1,1,1],"threeDStartRotation":false,"startRotationType":0,"startRotationConstant":0,"startRotationConstantMin":0,"startRotationConstantMax":0,"startRotationConstantSeparate":[0,0,0],"startRotationConstantMinSeparate":[0,0,0],"startRotationConstantMaxSeparate":[0,0,0],"randomizeRotationDirection":0,"startColorType":0,"startColorConstant":[0.08088237,0.6957402,1,1],"startColorConstantMin":[0,0,0,0],"startColorConstantMax":[0.08088237,0.6957402,1,1],"gravity":[0,-9.81,0],"gravityModifier":0,"simulationSpace":1,"scaleMode":1,"playOnAwake":true,"maxParticles":1000,"autoRandomSeed":true,"randomSeed":3179230232,"emission":{"enable":true,"emissionRate":0,"emissionRateTip":"Time","bursts":[{"time":0,"min":0,"max":1}]},"colorOverLifetime":{"enable":true,"color":{"type":1,"constant":[0,0,0,0],"gradient":{"alphas":[{"key":0,"value":0},{"key":0.523537,"value":1},{"key":1,"value":0}],"rgbs":[{"key":0,"value":[1,1,1]},{"key":1,"value":[1,1,1]}]},"constantMin":[0,0,0,0],"constantMax":[0,0,0,0],"gradientMax":{"alphas":[{"key":0,"value":0},{"key":0.523537,"value":1},{"key":1,"value":0}],"rgbs":[{"key":0,"value":[1,1,1]},{"key":1,"value":[1,1,1]}]}}},"renderMode":4,"stretchedBillboardCameraSpeedScale":0,"stretchedBillboardSpeedScale":0,"stretchedBillboardLengthScale":2,"sortingFudge":0,"material":{"type":"Laya.ShurikenParticleMaterial","path":"Assets/Resource/effect/texture/paimian.lmat"},"meshPath":"Assets/Resource/effect/mesh/plane1X1-Plane01.lm"},"components":{},"child":[]}]},{"type":"Sprite3D","props":{"isStatic":false,"name":"effect_dora"},"customProps":{"layer":0,"translate":[0,0,0],"rotation":[0,0,0,-1],"scale":[1,1,1]},"components":{},"child":[{"type":"MeshSprite3D","props":{"isStatic":false,"name":"effect"},"customProps":{"layer":0,"translate":[-0.01,-0.149,0.5],"rotation":[0,0,0,-1],"scale":[0.9503687,0.8695479,1],"meshPath":"Assets/Resource/effect/mesh/plane1X1-Plane01.lm","materials":[{"type":"Laya.StandardMaterial","path":"Assets/Resource/effect/texture/dora_shine/dora_shine.lmat"}]},"components":{},"child":[]}]},{"type":"Sprite3D","props":{"isStatic":false,"name":"effect_recommend"},"customProps":{"layer":0,"translate":[0,0,0],"rotation":[0,0,0,-1],"scale":[1,1,1]},"components":{},"child":[{"type":"MeshSprite3D","props":{"isStatic":false,"name":"effect"},"customProps":{"layer":0,"translate":[-0.01,1.66,-0.52],"rotation":[0,0,0,-1],"scale":[0.75,0.34,1],"meshPath":"Assets/Resource/effect/mesh/plane1X1-Plane01.lm","materials":[{"type":"Laya.StandardMaterial","path":"Assets/Resource/Materials/recommend.lmat"}]},"components":{},"child":[]}]}]}]}]}