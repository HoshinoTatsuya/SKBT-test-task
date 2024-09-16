import { CategoryExceptionEnum } from '../enums'
import { badResponseSchemaFactory } from '../factories/bad-response-schema.factory'
import { categoryExceptionEn } from '../translations/en/category.exception'

export const categorySchemas = {
  [CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND]: badResponseSchemaFactory(categoryExceptionEn.CATEGORY_IS_NOT_FOUND),
  [CategoryExceptionEnum.SLUG_ALREADY_EXIST]: badResponseSchemaFactory(categoryExceptionEn.SLUG_ALREADY_EXIST),
}
