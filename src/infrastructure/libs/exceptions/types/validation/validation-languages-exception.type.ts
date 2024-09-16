import { SupportLanguageEnum } from '../../enums/support-language.enum'

import { ValidationExceptionType } from './validation-exception.type'

export type ValidationLanguagesExceptionType = Record<keyof typeof SupportLanguageEnum, ValidationExceptionType>
