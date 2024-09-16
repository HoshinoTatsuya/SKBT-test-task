import { CategoryExceptionEnum, CommonExceptionEnum } from '../enums'
import { UnionEnumType } from '../types'

export const codeError: Record<keyof UnionEnumType, number> = {
  // Common
  [CommonExceptionEnum.INTERNAL_SERVER_ERROR]: 500,
  [CommonExceptionEnum.BAD_REQUEST]: 400,
  [CommonExceptionEnum.UNKNOWN_ERROR]: 520,
  [CommonExceptionEnum.DATA_DUPLICATION]: 400,
  [CommonExceptionEnum.VALIDATION]: 422,

  // Category
  [CategoryExceptionEnum.SLUG_ALREADY_EXIST]: 10001,
  [CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND]: 10002,
}
