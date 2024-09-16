import { Provider } from '@nestjs/common'

import { CategoryUsecase } from '../../domain/usecases/category.usecase'
import { CategoryRepository } from '../repositories/category/category.repository'

export const CATEGORY_USECASE = Symbol('CATEGORY_USECASE')
export const CategoryProvider: Provider = {
  inject: [CategoryRepository],
  provide: CATEGORY_USECASE,
  useFactory: (categoryRepository: CategoryRepository) => new CategoryUsecase(categoryRepository),
}
