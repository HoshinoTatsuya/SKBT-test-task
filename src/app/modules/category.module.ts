import { Module } from '@nestjs/common'

import { CategoryController } from '../controllers/category/category.controller'
import { CATEGORY_USECASE, CategoryProvider } from '../providers/category.provider'

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CategoryProvider],
  exports: [CATEGORY_USECASE],
})
export class CategoryModule {}
