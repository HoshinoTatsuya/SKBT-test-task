import { SupportLanguageEnum } from '../enums/support-language.enum'

import { CustomExceptionType } from './custom-exception.type'

export type TranslationCustomExceptionType = Record<keyof typeof SupportLanguageEnum, CustomExceptionType>
