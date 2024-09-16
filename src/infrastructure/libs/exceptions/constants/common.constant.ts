import { SupportLanguageEnum } from '../enums/support-language.enum'
import { commonExceptionEn, commonExceptionRu } from '../translations'
import { CommonLanguagesExceptionType } from '../types'

export const commonExceptions: CommonLanguagesExceptionType = {
  [SupportLanguageEnum.RU]: commonExceptionRu,
  [SupportLanguageEnum.EN]: commonExceptionEn,
}
