import { UnionEnum } from '../enums'
import { SupportLanguageEnum } from '../enums/support-language.enum'

import { ParseResponseErrorType } from './parse-response.type'

export type ErrorSubstitutionType = {
  error: ParseResponseErrorType
  language?: SupportLanguageEnum
  substitution?: UnionEnum
  loggingTrueData?: boolean
  loggingSubstitution?: boolean
}
