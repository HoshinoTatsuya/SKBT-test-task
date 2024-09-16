import { BadRequestException, Logger } from '@nestjs/common'
import { ApiResponseOptions } from '@nestjs/swagger'

import { categoryExceptions } from './constants/category.constant'
import { commonExceptions } from './constants/common.constant'
import { validationExceptions } from './constants/validation.constant'
import { CategoryExceptionEnum, CommonExceptionEnum } from './enums'
import { SupportLanguageEnum } from './enums/support-language.enum'
import { categorySchemas, commonSchemas } from './swagger-schemas'
import {
  CommonLanguagesExceptionType,
  ErrorSubstitutionType,
  ExceptionType,
  ParseResponseErrorType,
  TranslationCustomExceptionType,
  ValidationLanguagesExceptionType,
} from './types'
import { CategoryLanguagesExceptionType } from './types/category'

export class BaseException extends Error {
  public code?: number
  public message: string
  public stack?: string
  public description?: string
  public errorName?: string

  private readonly _logger = new Logger(BaseException.name)

  public constructor(params?: ExceptionType, logger = true) {
    super()

    this.code = params?.code
    this.message = params?.message
    this.description = params?.description
    this.errorName = params?.errorName

    this._logError({ ...params, logger })
  }

  public static get category(): CategoryLanguagesExceptionType {
    return categoryExceptions
  }

  public static get categorySchema(): Record<CategoryExceptionEnum, ApiResponseOptions> {
    return categorySchemas
  }

  public static get validation(): ValidationLanguagesExceptionType {
    return validationExceptions
  }

  public static get common(): CommonLanguagesExceptionType {
    return commonExceptions
  }

  public static get commonSchema(): Record<CommonExceptionEnum, ApiResponseOptions> {
    return commonSchemas
  }

  protected get _heap(): TranslationCustomExceptionType {
    return {
      [SupportLanguageEnum.RU]: {
        ...categoryExceptions.RU,
        ...commonExceptions.RU,
      },
      [SupportLanguageEnum.EN]: {
        ...categoryExceptions.EN,
        ...commonExceptions.EN,
      },
    }
  }

  public static checkErrorIntoData<TypeData>(data: TypeData & BaseException): boolean {
    return !!Object.keys(data).includes('code')
  }

  public static createError(data: BaseException, language = SupportLanguageEnum.EN): BadRequestException {
    const errorData = new BaseException()._heap[language][data.errorName]

    if (typeof data.description === 'string') {
      if (data.description.includes(':')) {
        const [errorPrefix] = errorData.description.split(':')
        const [, dataSuffix] = data.description.split(':')
        errorData.description = `${errorPrefix}:${dataSuffix}`
      }
    }

    throw new BaseException(
      {
        code: errorData.code,
        message: errorData.message,
        description: errorData.description,
        errorName: errorData.errorName,
      },
      false,
    )
  }

  public errorSubstitution({
    error,
    language = SupportLanguageEnum.EN,
    substitution = CommonExceptionEnum.INTERNAL_SERVER_ERROR,
    loggingTrueData = true,
    loggingSubstitution = false,
  }: ErrorSubstitutionType): BaseException {
    const substitutionError = this._heap[language][substitution]
    const message = BaseException.common[language].UNKNOWN_ERROR.message

    this._logError({ message, description: error.message, logger: loggingTrueData })

    return new BaseException(substitutionError, loggingSubstitution)
  }

  public parse<T extends ParseResponseErrorType>(
    data: T,
    language = SupportLanguageEnum.EN,
    logging = false,
  ): BaseException | null {
    if (!data.errorName || !data.code) {
      return
    }

    const errorData = this._getError(language, data)

    return new BaseException(errorData, logging)
  }

  private _getError(language: SupportLanguageEnum, data?: ParseResponseErrorType): ExceptionType {
    const err = this._heap[language][data.errorName]

    if (err) {
      return err
    }

    const unknownError = BaseException.common[language].UNKNOWN_ERROR

    unknownError.description += data.message

    return unknownError
  }

  private _logError(params: ExceptionType & { logger: boolean }): void {
    if (params?.code && params?.description && params?.message && params.logger) {
      this._logger.error(
        'Error: ' + params?.message + ' Code: ' + params?.code + ' Description: ' + params?.description,
      )
    } else if (params?.description && params?.message && params.logger) {
      this._logger.error('Error: ' + params?.message + ' Description: ' + params?.description)
    } else if (params?.message && params.logger) {
      this._logger.error('Error: ' + params?.message)
    }
  }
}
