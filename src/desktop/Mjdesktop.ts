import Room = desktop.Room
module desktop {
  export class Mjdesktop {
    private resource: string
    private table_cloth_resource: string
    private table_cloth: Laya.Sprite3D
    private mjdesktop: Laya.Scene
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
          { url: 'res/atlas/chs_t/myres/mjdesktop.atlas' },
          { url: 'res/atlas/chs_t/myres/mjdesktop/number.atlas' },
          { url: 'res/scene/hand_human.lh' },
          { url: 'res/scene/liqi_default.lh' },
          { url: 'res/scene/mjhandpai.ls' },
        ],
        Laya.Handler.create(this, this.completeHandler)
      )
    }
    private completeHandler() {
      this.mjdesktop = Laya.loader.getRes(this.resource)
      this.room = new Room(
        this.mjdesktop.getChildByName('room') as Laya.Sprite3D
      )
      this.mjdesktop.getChildByName('room').removeChildByName('all')
      this.main_camare = this.mjdesktop.getChildByName(
        'main_camare'
      ) as Laya.Camera
      this.light = this.mjdesktop.getChildByName('light') as Laya.LightSprite
      this.mjdesktop.zOrder = -1
      // Laya.stage.addChild(this.mjdesktop)
      this.table_cloth = Laya.loader.getRes(this.table_cloth_resource)
      this.mjdesktop.addChild(this.table_cloth)
      this.mjdesktop.ambientColor = new Laya.Vector3(0.7, 0.7, 0.7)
      this.initLight()
    }
    private initLight() {
      //创建点光
      this.point_light = this.mjdesktop.addChild(
        new Laya.PointLight()
      ) as Laya.PointLight
      //移动灯光位置
      this.point_light.transform.translate(new Laya.Vector3(0, 45, 0))
      //设置点光照亮范围
      this.point_light.range = 60
      //设置点光的衰减
      this.point_light.attenuation = new Laya.Vector3(0.01, 0.01, 0.03)
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
    public setRoom(room: Room) {
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
