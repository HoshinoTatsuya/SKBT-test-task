import { SupportLanguageEnum } from '../../enums/support-language.enum'

import { CommonExceptionType } from './common-exception.type'

export type CommonLanguagesExceptionType = Record<keyof typeof SupportLanguageEnum, CommonExceptionType>
