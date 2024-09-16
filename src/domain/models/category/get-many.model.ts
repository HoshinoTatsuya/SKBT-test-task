import { BaseCategoryModel } from './base-category.model'

export class GetManyModel {
  public items: BaseCategoryModel[]
  public totals: number

  public constructor(data: GetManyModel) {
    this.items = data.items && data.items?.length > 0 ? data.items.map((item) => new BaseCategoryModel(item)) : []
    this.totals = data.totals
  }
}
