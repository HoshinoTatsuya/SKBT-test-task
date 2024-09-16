export class BaseDataModel {
  public id: string
  public createdDate: Date
  public updatedDate?: Date
  public deletedDate?: Date

  public constructor(data: BaseDataModel) {
    this.id = data.id
    this.createdDate = data.createdDate
    this.updatedDate = data.updatedDate
    this.deletedDate = data.deletedDate
  }
}
