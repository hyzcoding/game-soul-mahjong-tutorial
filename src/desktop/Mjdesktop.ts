module mjdesktop {
  export class Mjdesktop {
    private resource: string
    private table_cloth_resource: string
    private table_cloth: Laya.Sprite3D
    private mjdesktop: Laya.Scene
    private container_desktop: Laya.Sprite3D
    private room: Room
    private main_camare: Laya.Camera | null
    private light: Laya.LightSprite | null
    private point_light: Laya.PointLight
    constructor(resource: string, table_cloth_resource: string) {
      this.resource = resource
      this.table_cloth_resource = table_cloth_resource
      Laya.loader.create(
        [
          { url: resource },
          { url: table_cloth_resource },
          // 麻将桌
          { url: 'res/atlas/myres/mjdesktop.atlas' },
          // 分数
          { url: 'res/atlas/myres/mjdesktop/number.atlas' },
          // 人手动画
          { url: 'res/scene/hand_human.lh' },
          { url: 'res/scene/liqi_default.lh' },
          // 麻将牌
          { url: 'res/scene/mjhandpai.ls' },
        ],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    private completeHandler() {
      this.mjdesktop = Laya.loader.getRes(this.resource)
      // 创建房间场景
      this.room = new Room(
        this.mjdesktop.getChildByName('room') as Laya.Sprite3D
      )
      this.container_desktop = this.mjdesktop
        .getChildByName('room')
        .getChildByName('container_desktop') as Laya.Sprite3D
      this.main_camare = this.mjdesktop.getChildByName(
        'main_camera'
      ) as Laya.Camera
      this.light = this.mjdesktop.getChildByName('light') as Laya.LightSprite
      this.mjdesktop.zOrder = -1
      Laya.stage.addChild(this.mjdesktop)
      this.table_cloth = Laya.loader.getRes(this.table_cloth_resource)
      this.container_desktop.addChild(this.table_cloth)
      this.initDirectLight()
    }
    private initDirectLight() {
      //创建平行光
      var light: Laya.DirectionLight = this.mjdesktop.addChild(
        new Laya.DirectionLight()
      ) as Laya.DirectionLight
      light.color = new Laya.Vector3(0.5, 0.5, 0.5)
      // light.intensity = 1
      // this.mjdesktop._addLight(light)
      //设置平行光的方向
      light.direction = new Laya.Vector3(
        0,
        -0.9329584836959839,
        -0.35998398065567017
      )
    }
    public getCamare() {
      return this.main_camare
    }
    public setCamare(main_camare: Laya.Camera) {
      this.main_camare = main_camare
    }
    public getLight() {
      return this.light
    }
    public setLight(light: Laya.LightSprite) {
      this.light = light
    }
    public getRoom() {
      return this.room
    }
    public setRoom(room: any) {
      this.room = room
    }
    public getScene() {
      return this.mjdesktop
    }
    public setScene(mjdesktop: Laya.Scene) {
      this.mjdesktop = mjdesktop
    }
  }
}
