import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ICategoryRepository } from '../../../domain/repositories/category/category.interface'
import {
  ICategoryIsExist,
  ICreateCategory,
  IDeleteCategory,
  IGetManyCategoryBy,
  IGetOneCategoryBy,
  IUpdateCategory,
} from '../../../domain/repositories/category/interfaces'
import {
  CreateCategoryModel,
  GetManyCategoryByModel,
  GetOneCategoryByModel,
  UpdateCategoryModel,
} from '../../../domain/repositories/category/models'
import { BaseException } from '../../../infrastructure/libs/exceptions'
import { CategoryEntity } from '../../entities/category/category.entity'
import { SortEnum } from '../enums/sort.enum'

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  public constructor(
    @InjectRepository(CategoryEntity) private readonly _categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async categoryIsExist(data: ICategoryIsExist): Promise<boolean | BaseException> {
    try {
      const fields = CategoryEntity.getFieldsName()

      const queryBuilderCategory = await this._categoryRepository.createQueryBuilder(CategoryEntity.tableName)

      if (!data || Object.values(data).length === 0) {
        return new BaseException(BaseException.common.EN.INTERNAL_SERVER_ERROR)
      }

      if (data.slug) {
        queryBuilderCategory.andWhere(`${fields.slug} = :slug`, { slug: data.slug })
      }

      if (data.name) {
        queryBuilderCategory.andWhere(`${fields.name} = :name`, { name: data.name })
      }

      if (data.id) {
        queryBuilderCategory.andWhere(`${fields.id} = :id`, { id: data.id })
      }

      return await queryBuilderCategory.getExists()
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async createCategory(data: ICreateCategory): Promise<CreateCategoryModel | BaseException> {
    try {
      const result = await this._categoryRepository.save(data)

      return new CreateCategoryModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async updateCategory(data: IUpdateCategory): Promise<UpdateCategoryModel | BaseException> {
    try {
      const fields = CategoryEntity.getFieldsName()
      const { id: categoryId, ...dataForUpdate } = data

      if (!dataForUpdate || Object.values(dataForUpdate).length === 0) {
        return new BaseException(BaseException.common.EN.INTERNAL_SERVER_ERROR)
      }

      const resultUpdate = await this._categoryRepository
        .createQueryBuilder(CategoryEntity.tableName)
        .andWhere(`${fields.id} = :categoryId`, { categoryId })
        .update(dataForUpdate)
        .execute()

      return new UpdateCategoryModel({ result: resultUpdate.affected > 0 })
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getOneCategoryBy(data: IGetOneCategoryBy): Promise<GetOneCategoryByModel | BaseException> {
    try {
      const fields = CategoryEntity.getFieldsName()

      const queryBuilderCategory = await this._categoryRepository.createQueryBuilder(CategoryEntity.tableName)

      if (!data || Object.values(data).length === 0) {
        return new BaseException(BaseException.common.EN.INTERNAL_SERVER_ERROR)
      }

      if (data.slug) {
        queryBuilderCategory.andWhere(`${fields.slug} = :slug`, { slug: data.slug })
      }

      if (data.id) {
        queryBuilderCategory.andWhere(`${fields.id} = :id`, { id: data.id })
      }

      const result = await queryBuilderCategory.getOne()

      if (!result) {
        return new BaseException(BaseException.category.EN.CATEGORY_IS_NOT_FOUND)
      }

      return new GetOneCategoryByModel(result)
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async getManyCategoryBy(data: IGetManyCategoryBy): Promise<GetManyCategoryByModel | BaseException> {
    try {
      const fields = CategoryEntity.getFieldsName()

      const queryBuilderCategory = this._categoryRepository.createQueryBuilder(CategoryEntity.tableName)

      if (data.search) {
        queryBuilderCategory.andWhere(
          `((
            TRANSLATE(LOWER(${fields.name}), 'ё', 'е') LIKE TRANSLATE(LOWER(:nameSearch), 'ё', 'е')
          ) OR (
            TRANSLATE(LOWER(${fields.description}), 'ё', 'е') LIKE TRANSLATE(LOWER(:descriptionSearch), 'ё', 'е')
          ))`,

          { nameSearch: `%${data.search}%`, descriptionSearch: `%${data.search}%` },
        )
      }

      if (data.name && (!data.search || data.search?.length === 0)) {
        queryBuilderCategory.andWhere(
          `TRANSLATE(LOWER(${fields.name}), 'ё', 'е') LIKE TRANSLATE(LOWER(:name), 'ё', 'е')`,
          { name: `%${data.name}%` },
        )
      }

      if (data.description && (!data.search || data.search?.length === 0)) {
        queryBuilderCategory.andWhere(
          `TRANSLATE(LOWER(${fields.description}), 'ё', 'е') LIKE TRANSLATE(LOWER(:description), 'ё', 'е')`,
          { description: `%${data.description}%` },
        )
      }

      if (data.active !== undefined) {
        queryBuilderCategory.andWhere(`${fields.active} = :active`, { active: data.active })
      }

      const { sortMethod, sortField } = this._getSort(data.sort)

      if (data.page && data.page === 1) {
        data.page = 0
      }

      const [items, totals] = await queryBuilderCategory
        .skip(data.page)
        .take(data.pageSize)
        .orderBy(sortField, sortMethod)
        .getManyAndCount()

      return new GetManyCategoryByModel({ items, totals })
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  public async deleteCategory(data: IDeleteCategory): Promise<boolean | BaseException> {
    try {
      const fields = CategoryEntity.getFieldsName()

      const result = await this._categoryRepository
        .createQueryBuilder(CategoryEntity.tableName)
        .andWhere(fields.id + ' = :categoryId', { categoryId: data.id })
        .softDelete()
        .execute()

      if (result.affected === 0) {
        return new BaseException(BaseException.category.EN.CATEGORY_IS_NOT_FOUND)
      }

      return true
    } catch (error) {
      return new BaseException().errorSubstitution({ error })
    }
  }

  private _getSort(sort?: string): {
    sortMethod: SortEnum
    sortField: string
  } {
    const fields = CategoryEntity.getFieldsName()
    let sortField = fields.createdDate
    let sortMethod = SortEnum.DESC

    if (sort) {
      if (sort.startsWith('-')) {
        sortMethod = SortEnum.DESC
        sort = sort.replace('-', '')
      } else {
        sortMethod = SortEnum.ASC
      }

      if (Object.keys(fields).indexOf(sort) !== -1) {
        sortField = fields[sort]
      }
    }

    return {
      sortMethod,
      sortField,
    }
  }
}
