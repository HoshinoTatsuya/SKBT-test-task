import { codeError } from '../../constants/code-error.constant'
import { CommonExceptionEnum } from '../../enums'
import { CommonExceptionType } from '../../types'

export const commonExceptionEn: CommonExceptionType = {
  [CommonExceptionEnum.INTERNAL_SERVER_ERROR]: {
    code: codeError[CommonExceptionEnum.INTERNAL_SERVER_ERROR],
    errorName: CommonExceptionEnum.INTERNAL_SERVER_ERROR,
    message: 'An internal server error has occurred!',
    description: 'An internal server error has occurred!',
  },
  [CommonExceptionEnum.BAD_REQUEST]: {
    code: codeError[CommonExceptionEnum.BAD_REQUEST],
    errorName: CommonExceptionEnum.BAD_REQUEST,
    message: 'The request was made incorrectly!',
    description: 'The request was made incorrectly!',
  },
  [CommonExceptionEnum.UNKNOWN_ERROR]: {
    code: codeError[CommonExceptionEnum.UNKNOWN_ERROR],
    errorName: CommonExceptionEnum.UNKNOWN_ERROR,
    message: 'Unknown error detected!',
    description: 'Unknown error detected: ',
  },
  [CommonExceptionEnum.DATA_DUPLICATION]: {
    code: codeError[CommonExceptionEnum.DATA_DUPLICATION],
    errorName: CommonExceptionEnum.DATA_DUPLICATION,
    message: 'Such data already exists in the system!',
    description: 'Such data already exists in the system!',
  },
  [CommonExceptionEnum.VALIDATION]: {
    code: codeError[CommonExceptionEnum.VALIDATION],
    errorName: CommonExceptionEnum.VALIDATION,
    message: 'Validation error!',
    description: '',
  },
}
