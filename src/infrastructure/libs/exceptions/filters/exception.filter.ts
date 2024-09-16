import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { ValidationError } from 'class-validator'

import { getShadowData } from '../../shadow-agent/shadow-agent'
import { BaseException } from '../base-exception'

import { BaseExceptionFilter } from './base-exception.filter'

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {
  public constructor() {
    super(new Logger(GlobalExceptionFilter.name))
  }

  public catch(exception: HttpException | BaseException | ValidationError[], host: ArgumentsHost): Response {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const shadowData = getShadowData(request)

    if (Array.isArray(exception) && exception.every((error) => error instanceof ValidationError)) {
      const { error, errorsDescriptions } = this._createValidationError(exception, shadowData.userLanguage)

      return response.status(error.code).send({
        code: error.code,
        message: error.message,
        description: errorsDescriptions,
        errorName: error.errorName,
      })
    }

    const errorMessage = this._getErrorMessage(exception)
    const errorStatusCode = this._getErrorStatusCode(exception)
    const errorCode = this._getErrorCode(exception)
    const errorDescription = this._getErrorDescription(exception)
    const errorName = this._getErrorName(exception)

    return response.status(errorStatusCode).send({
      code: errorCode,
      message: errorMessage,
      description: errorDescription,
      errorName,
    })
  }
}
