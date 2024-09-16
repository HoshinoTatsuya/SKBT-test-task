import { HttpException, HttpStatus, Logger } from '@nestjs/common'
import { getMetadataStorage, MetadataStorage, ValidationError } from 'class-validator'
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata'

import { BaseException } from '../base-exception'
import { constraint } from '../constants/nesting-text.constant'
import { SupportLanguageEnum } from '../enums/support-language.enum'

interface HttpExceptionResponse {
  statusCode: number
  message: string
  error: string
}

export class BaseExceptionFilter {
  private readonly _logger: Logger
  private _metadataStorage: MetadataStorage

  public constructor(logger: Logger) {
    this._logger = logger
    this._metadataStorage = getMetadataStorage()
  }

  protected _createValidationError(
    exception: ValidationError[],
    language: SupportLanguageEnum = SupportLanguageEnum.EN,
  ): {
    error: BaseException
    errorsDescriptions: Record<string, unknown> | string
  } {
    const errorsList = this._createExceptionFactory(language, exception)

    const errorsDescriptions = {}

    for (const [key, value] of Object.entries(errorsList)) {
      // Приведение значения к массиву (если значение уже массив, используется оно)
      const valuesError = Array.isArray(value) ? value : Object.values(value)

      if (valuesError.every((item) => typeof item === 'string')) {
        // Соединение строк, если все элементы - строки
        errorsDescriptions[key] = valuesError.join(' ')
      } else if (valuesError.every((item) => typeof item === 'object')) {
        // Инициализация объекта, если нужно обработать вложенные объекты
        errorsDescriptions[key] = errorsDescriptions[key] || {}
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          // Обработка каждого вложенного объекта
          errorsDescriptions[key][nestedKey] = Object.values(nestedValue).join(' ')
        }
      }
    }

    const error = new BaseException(BaseException.common[language].VALIDATION)

    return { error, errorsDescriptions }
  }

  protected _getErrorStatusCode(exception: HttpException | BaseException | unknown): number {
    if (exception instanceof BaseException) {
      const baseCodesException = Object.values(HttpStatus).filter((status) => typeof status === 'number')

      return baseCodesException.includes(exception.code) ? exception.code : BaseException.common.EN.BAD_REQUEST.code
    } else if (exception instanceof HttpException) {
      return exception.getStatus()
    }

    return BaseException.common.EN.INTERNAL_SERVER_ERROR.code
  }

  protected _getErrorCode(exception: HttpException | BaseException | unknown): number {
    if (exception instanceof BaseException) {
      return exception.code
    } else if (exception instanceof HttpException) {
      return exception.getStatus()
    }

    return BaseException.common.EN.INTERNAL_SERVER_ERROR.code
  }

  protected _getErrorMessage(exception: HttpException | BaseException | Error | unknown): string {
    if (exception instanceof HttpException) {
      return (exception.getResponse() as HttpExceptionResponse)?.error?.trim()?.toUpperCase().replace(' ', '_')
    } else if (exception instanceof BaseException) {
      return exception.message
    } else if (exception instanceof Error) {
      return exception.message
    }

    return BaseException.common.EN.INTERNAL_SERVER_ERROR.message
  }

  protected _getErrorDescription(exception: HttpException | BaseException | unknown): string | NonNullable<unknown> {
    if (exception instanceof HttpException) {
      return (exception.getResponse() as HttpExceptionResponse).message
    } else if (exception instanceof BaseException) {
      return exception.description
    }

    return BaseException.common.EN.INTERNAL_SERVER_ERROR.description
  }

  protected _getErrorName(exception: HttpException | BaseException | unknown): string | NonNullable<unknown> {
    if (exception instanceof HttpException) {
      return exception.name
    } else if (exception instanceof BaseException) {
      return exception.errorName
    }

    return BaseException.common.EN.INTERNAL_SERVER_ERROR.errorName
  }

  private _createErrorObject(
    keysConstraints: string[],
    validationErrors: ValidationError,
    language: SupportLanguageEnum = SupportLanguageEnum.EN,
  ): Record<string, string> {
    const result = {}
    keysConstraints.forEach((keysConstraint) => {
      const decoratorMetadata = this._getDecoratorMetadata(
        validationErrors.target,
        validationErrors.property,
        keysConstraint,
      )

      const newErrorString = new BaseException(BaseException.validation[language][keysConstraint], false)

      if (typeof decoratorMetadata.constraints === 'object') {
        for (const constraintKey of Object.keys(decoratorMetadata.constraints)) {
          newErrorString.description = newErrorString.description.replace(
            constraintKey,
            decoratorMetadata.constraints[constraintKey],
          )
        }
      }

      if (decoratorMetadata && typeof decoratorMetadata?.constraints === 'string') {
        newErrorString.description = newErrorString.description.replace(constraint, decoratorMetadata.constraints)
      }

      if (typeof decoratorMetadata.constraints === 'object' && newErrorString.description.includes(constraint)) {
        const keys = Object.keys(decoratorMetadata.constraints)
        newErrorString.description = newErrorString.description.replace(constraint, keys.join(','))
      }

      result[keysConstraint] = newErrorString.description
    })

    return result
  }

  private _getErrorsList(
    language: SupportLanguageEnum = SupportLanguageEnum.EN,
    validationErrors: ValidationError[] = [],
  ): Record<string, Record<string, string>> {
    return validationErrors.reduce((acc, error: ValidationError) => {
      const keysConstraints = Object.keys(error.constraints)

      const result = this._createErrorObject(keysConstraints, error, language)

      acc[error.property] = {
        ...result,
      }
      return acc
    }, {})
  }

  private _createExceptionFactory(
    language: SupportLanguageEnum = SupportLanguageEnum.EN,
    validationErrors: ValidationError[] = [],
  ): Record<string, Record<string, string>> | Record<string, Record<string, Record<string, string>>> {
    // Инициализируем объекты для хранения ошибок
    const errorListWithoutChildren = {}
    const errorListWithChildren = {}

    // Обработка всех ошибок одним проходом
    validationErrors.forEach((error) => {
      if (error.children && error.children.length > 0) {
        // Для ошибок с Children заполняем errorListWithChildren
        errorListWithChildren[error.property] = this._getErrorsList(language, error.children)
      } else {
        // Для ошибок без Children заполняем errorListWithoutChildren
        const propertyErrors = this._getErrorsList(language, [error])
        errorListWithoutChildren[error.property] = propertyErrors[error.property]
      }
    })

    // Мердж двух списков ошибок, если есть ошибки с детьми, иначе только ошибки без Children
    if (Object.keys(errorListWithChildren).length > 0) {
      return { ...errorListWithoutChildren, ...errorListWithChildren }
    }

    return errorListWithoutChildren
  }

  private _getDecoratorMetadata(
    target: NonNullable<unknown>,
    propertyName: string,
    constraintName: string,
  ): Omit<ValidationMetadata, 'constraints'> & { constraints: string | NonNullable<unknown> } {
    const metadatas = this._metadataStorage.getTargetValidationMetadatas(
      target.constructor,
      target.constructor.name,
      true,
      true,
    )

    const resultData = metadatas.find((meta) => meta.propertyName === propertyName && meta.name === constraintName)
    const result: Omit<ValidationMetadata, 'constraints'> & {
      constraints: string | NonNullable<unknown>
    } = Object.assign({}, resultData)

    if (result) {
      if (typeof result.constraints === undefined) {
        result.constraints = ''
      } else if (
        Array.isArray(result.constraints) &&
        result.constraints.every(
          (constraintData) => typeof constraintData === 'string' || typeof constraintData === 'number',
        )
      ) {
        result.constraints = result.constraints.join()
      } else if (
        Array.isArray(result.constraints) &&
        result.constraints.every((constraintData) => typeof constraintData === 'object')
      ) {
        result.constraints = result.constraints[0]
      }
    }

    return result
  }
}
