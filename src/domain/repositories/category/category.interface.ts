import { BaseException } from '../../../infrastructure/libs/exceptions'

import {
  ICategoryIsExist,
  ICreateCategory,
  IDeleteCategory,
  IGetManyCategoryBy,
  IGetOneCategoryBy,
  IUpdateCategory,
} from './interfaces'
import { CreateCategoryModel, GetManyCategoryByModel, GetOneCategoryByModel, UpdateCategoryModel } from './models'

export abstract class ICategoryRepository {
  public abstract createCategory(data: ICreateCategory): Promise<CreateCategoryModel | BaseException>

  public abstract categoryIsExist(data: ICategoryIsExist): Promise<boolean | BaseException>

  public abstract updateCategory(data: IUpdateCategory): Promise<UpdateCategoryModel | BaseException>

  public abstract getOneCategoryBy(data: IGetOneCategoryBy): Promise<GetOneCategoryByModel | BaseException>

  public abstract getManyCategoryBy(data: IGetManyCategoryBy): Promise<GetManyCategoryByModel | BaseException>

  public abstract deleteCategory(data: IDeleteCategory): Promise<boolean | BaseException>
}
