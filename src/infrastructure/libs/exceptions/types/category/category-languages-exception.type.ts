import { SupportLanguageEnum } from '../../enums/support-language.enum'

import { CategoryExceptionType } from './category-exception.type'

export type CategoryLanguagesExceptionType = Record<keyof typeof SupportLanguageEnum, CategoryExceptionType>
