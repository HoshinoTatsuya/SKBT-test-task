import { CategoryEntity } from '../../../../app/entities/category/category.entity'
import { BaseDataModel } from '../../models/base-data.model'

export class BaseCategoryModel extends BaseDataModel implements CategoryEntity {
  public id: string
  public slug: string
  public name: string
  public description?: string
  public active: boolean

  public constructor(data: BaseCategoryModel) {
    super(data)
    this.id = data.id
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.active = data.active
  }
}
