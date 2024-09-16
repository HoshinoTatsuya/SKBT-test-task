import { SupportLanguageEnum } from '../enums/support-language.enum'
import { validationExceptionEn, validationExceptionRu } from '../translations'
import { ValidationLanguagesExceptionType } from '../types'

export const validationExceptions: ValidationLanguagesExceptionType = {
  [SupportLanguageEnum.RU]: validationExceptionRu,
  [SupportLanguageEnum.EN]: validationExceptionEn,
}
