module caps {
  export class Material_TwoSided extends Laya.BaseMaterial {
    static DIFFUSETEXTURE: number = 1
    static MARGINALCOLOR: number = 2
    constructor() {
      super()
      this.name = ''
      this.setShaderName('twosided')
    }
    public getBool(index: number): Laya.BaseTexture {
      return this._getBool(index)
    }
    public getColor(index: number): Laya.BaseTexture {
      return this._getColor(index)
    }
    public getInt(index: number): Laya.BaseTexture {
      return this._getInt(index)
    }
    public getNumber(index: number): Laya.BaseTexture {
      return this._getNumber(index)
    }
    public getTexture(index: number): Laya.BaseTexture {
      return this._getTexture(index)
    }
    public getVector2(index: number): Laya.BaseTexture {
      return this._getVector2(index)
    }
    public setBool(shaderIndex: number, b: boolean): void {
      return this._setBool(shaderIndex, b)
    }
    public setColor(shaderIndex: number, color: any): void {
      return this._setColor(shaderIndex, color)
    }
    public setInt(shaderIndex: number, i: number): void {
      return this._setInt(shaderIndex, i)
    }
    public setNumber(shaderIndex: number, number: number): void {
      return this._setNumber(shaderIndex, number)
    }
    public setTexture(index: number, texture: Laya.BaseTexture) {
      this._setTexture(index, texture)
    }

    public setVector2(shaderIndex: number, vector2: Laya.Vector2): void {
      this._setVector2(shaderIndex, vector2)
    }
  }
}
