import { codeError } from '../../constants/code-error.constant'
import { CategoryExceptionEnum } from '../../enums'
import { CategoryExceptionType } from '../../types/category'

export const categoryExceptionRu: CategoryExceptionType = {
  [CategoryExceptionEnum.SLUG_ALREADY_EXIST]: {
    code: codeError[CategoryExceptionEnum.SLUG_ALREADY_EXIST],
    errorName: CategoryExceptionEnum.SLUG_ALREADY_EXIST,
    message: `Данный slug уже существует в системе!`,
    description: `Данный slug уже существует в системе!`,
  },
  [CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND]: {
    code: codeError[CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND],
    errorName: CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND,
    message: `Категория не найдена!`,
    description: `Категория не найдена!`,
  },
}
