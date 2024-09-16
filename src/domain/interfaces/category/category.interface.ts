import { BaseException } from '../../../infrastructure/libs/exceptions'
import { CreateCategoryModel, DeleteModel, GetManyModel, GetOneModel, PartialUpdateModel } from '../../models/category'

import { ICreateCategory, IDelete, IGetMany, IGetOne, IPartialUpdate } from './methods'

export abstract class ICategory {
  public abstract createCategory(data: ICreateCategory): Promise<CreateCategoryModel | BaseException>

  public abstract getOne(data: IGetOne): Promise<GetOneModel | BaseException>

  public abstract getMany(data: IGetMany): Promise<GetManyModel | BaseException>

  public abstract partialUpdate(data: IPartialUpdate): Promise<PartialUpdateModel | BaseException>

  public abstract delete(data: IDelete): Promise<DeleteModel | BaseException>
}
