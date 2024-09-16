import { SupportLanguageEnum } from '../enums/support-language.enum'
import { categoryExceptionEn, categoryExceptionRu } from '../translations'
import { CategoryLanguagesExceptionType } from '../types/category'

export const categoryExceptions: CategoryLanguagesExceptionType = {
  [SupportLanguageEnum.RU]: categoryExceptionRu,
  [SupportLanguageEnum.EN]: categoryExceptionEn,
}
