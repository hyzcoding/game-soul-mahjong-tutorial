module mjdesktop {
  export class Other {
    private chang_number: number
    private ju_number: number
    private left_number: number
    private chang: Laya.Sprite3D
    left: Laya.Sprite3D
    other: Laya.Sprite3D
    constructor(
      chang_number: number,
      ju_number: number,
      left_number,
      other: Laya.Sprite3D
    ) {
      this.chang_number = chang_number
      this.ju_number = ju_number
      this.other = other
      this.left_number = left_number
      this.chang = other.getChildByName('chang') as Laya.Sprite3D
      this.init()
    }
    private init(): void {
      // 大写的 东xx局
      var chang_chang = this.chang.getChildByName('chang') as Laya.MeshSprite3D
      var material_chang_chang = chang_chang.meshRender
        .material as Laya.BlinnPhongMaterial
      var to_chang_chang = material_chang_chang.tilingOffset.elements
      to_chang_chang[2] = (1 * this.chang_number) / 6
      var chang_ju = this.chang.getChildByName('ju') as Laya.MeshSprite3D
      var material_chang_ju = chang_ju.meshRender
        .material as Laya.BlinnPhongMaterial
      var to_chang_ju = material_chang_ju.tilingOffset.elements
      to_chang_ju[2] = 0.1 * (this.ju_number - 1)
      var chang_juzi = this.chang.getChildByName('juzi') as Laya.MeshSprite3D
      // 余xx
      this.left = this.other.getChildByName('left') as Laya.Sprite3D
      var left_left = this.left.getChildByName('left') as Laya.Sprite3D
      var left_0 = this.left.getChildByName('0') as Laya.MeshSprite3D
      var material_0 = left_0.meshRender.material as Laya.BlinnPhongMaterial
      var to_0 = material_0.tilingOffset.elements
      to_0[2] = 0.1 * (this.left_number % 10)
      var left_1 = this.left.getChildByName('1') as Laya.MeshSprite3D
      var material_1 = left_1.meshRender.material as Laya.BlinnPhongMaterial
      var to_1 = material_1.tilingOffset.elements
      to_1[2] = 0.1 * Math.floor(this.left_number / 10)
    }
  }
}
