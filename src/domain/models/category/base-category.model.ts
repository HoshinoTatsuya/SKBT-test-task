export class BaseCategoryModel {
  public id: string
  public createdDate: Date
  public slug: string
  public name: string
  public description?: string
  public active: boolean

  public constructor(data: BaseCategoryModel) {
    this.id = data.id
    this.createdDate = data.createdDate
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.active = data.active
  }
}
