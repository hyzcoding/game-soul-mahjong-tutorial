module lobby {
  export class ContentItem extends Laya.Box {
    private room: Laya.Label
    private date: Laya.Label
    private remarks_info: Laya.Label
    constructor() {
      super()
    }
    public setRoom(text: string) {
      this.room.text = text
    }
    public setDate(text: string) {
      this.date.text = text
    }
    public setRemarksInfo(text: string) {
      this.remarks_info.text = text
    }
  }
}
