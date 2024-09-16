import { codeError } from '../../constants/code-error.constant'
import { CommonExceptionEnum } from '../../enums'
import { CommonExceptionType } from '../../types'

export const commonExceptionRu: CommonExceptionType = {
  [CommonExceptionEnum.INTERNAL_SERVER_ERROR]: {
    code: codeError[CommonExceptionEnum.INTERNAL_SERVER_ERROR],
    errorName: CommonExceptionEnum.INTERNAL_SERVER_ERROR,
    message: 'Произошла внутренняя ошибка сервера!',
    description: 'Произошла внутренняя ошибка сервера!',
  },
  [CommonExceptionEnum.BAD_REQUEST]: {
    code: codeError[CommonExceptionEnum.BAD_REQUEST],
    errorName: CommonExceptionEnum.BAD_REQUEST,
    message: 'Запрос был произведён некорректно!',
    description: 'Запрос был произведён некорректно!',
  },
  [CommonExceptionEnum.UNKNOWN_ERROR]: {
    code: codeError[CommonExceptionEnum.UNKNOWN_ERROR],
    errorName: CommonExceptionEnum.UNKNOWN_ERROR,
    message: 'Зафиксирована неизвестная ошибка!',
    description: 'Зафиксирована неизвестная ошибка: ',
  },
  [CommonExceptionEnum.DATA_DUPLICATION]: {
    code: codeError[CommonExceptionEnum.DATA_DUPLICATION],
    errorName: CommonExceptionEnum.DATA_DUPLICATION,
    message: 'Такие данные уже существуют в системе!',
    description: 'Такие данные уже существуют в системе!',
  },
  [CommonExceptionEnum.VALIDATION]: {
    code: codeError[CommonExceptionEnum.VALIDATION],
    errorName: CommonExceptionEnum.VALIDATION,
    message: 'Ошибка валидации!',
    description: '',
  },
}
