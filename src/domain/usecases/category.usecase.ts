import { Injectable } from '@nestjs/common'

import { BaseException } from '../../infrastructure/libs/exceptions'
import { ICategory } from '../interfaces'
import { ICreateCategory, IDelete, IGetMany, IGetOne, IPartialUpdate } from '../interfaces/category/methods'
import { CreateCategoryModel, DeleteModel, GetManyModel, GetOneModel, PartialUpdateModel } from '../models/category'
import { ICategoryRepository } from '../repositories/category/category.interface'

@Injectable()
export class CategoryUsecase implements ICategory {
  public constructor(private readonly _categoryRepository: ICategoryRepository) {}

  public async createCategory(data: ICreateCategory): Promise<CreateCategoryModel | BaseException> {
    const categorySlugAlreadyExist = await this._categoryRepository.categoryIsExist({ slug: data.slug })

    if (categorySlugAlreadyExist instanceof BaseException) {
      return categorySlugAlreadyExist
    }

    if (categorySlugAlreadyExist) {
      return new BaseException(BaseException.category.EN.SLUG_ALREADY_EXIST)
    }

    const result = await this._categoryRepository.createCategory(data)

    if (result instanceof BaseException) {
      return result
    }

    return new CreateCategoryModel(result)
  }

  public async getOne(data: IGetOne): Promise<GetOneModel | BaseException> {
    if (Object.keys(data).length === 0) {
      return new BaseException(BaseException.common.EN.BAD_REQUEST)
    }

    const result = await this._categoryRepository.getOneCategoryBy({ ...data })

    if (result instanceof BaseException) {
      return result
    }

    return new GetOneModel(result)
  }

  public async getMany(data: IGetMany): Promise<GetManyModel | BaseException> {
    const result = await this._categoryRepository.getManyCategoryBy(data)

    if (result instanceof BaseException) {
      return result
    }

    return new GetManyModel(result)
  }

  public async partialUpdate(data: IPartialUpdate): Promise<PartialUpdateModel | BaseException> {
    const categoryIsExist = await this._categoryRepository.categoryIsExist({ id: data.id })

    if (categoryIsExist instanceof BaseException) {
      return categoryIsExist
    }

    if (!categoryIsExist) {
      return new BaseException(BaseException.category.EN.CATEGORY_IS_NOT_FOUND)
    }

    if (data.slug) {
      const categorySlugAlreadyExist = await this._categoryRepository.categoryIsExist({ slug: data.slug })

      if (categorySlugAlreadyExist instanceof BaseException) {
        return categorySlugAlreadyExist
      }

      if (categorySlugAlreadyExist) {
        return new BaseException(BaseException.category.EN.SLUG_ALREADY_EXIST)
      }
    }

    const result = await this._categoryRepository.updateCategory(data)

    if (result instanceof BaseException) {
      return result
    }

    return new PartialUpdateModel(result)
  }

  public async delete(data: IDelete): Promise<DeleteModel | BaseException> {
    const resultDelete = await this._categoryRepository.deleteCategory({ id: data.id })

    if (resultDelete instanceof BaseException) {
      return resultDelete
    }

    return new DeleteModel({ result: resultDelete })
  }
}
