import { codeError } from '../../constants/code-error.constant'
import { CategoryExceptionEnum } from '../../enums'
import { CategoryExceptionType } from '../../types/category'

export const categoryExceptionEn: CategoryExceptionType = {
  [CategoryExceptionEnum.SLUG_ALREADY_EXIST]: {
    code: codeError[CategoryExceptionEnum.SLUG_ALREADY_EXIST],
    errorName: CategoryExceptionEnum.SLUG_ALREADY_EXIST,
    message: `This slug already exists in the system!`,
    description: `This slug already exists in the system!`,
  },
  [CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND]: {
    code: codeError[CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND],
    errorName: CategoryExceptionEnum.CATEGORY_IS_NOT_FOUND,
    message: `Category not found!`,
    description: `Category not found!`,
  },
}
