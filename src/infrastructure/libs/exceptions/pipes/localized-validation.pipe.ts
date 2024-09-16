import { HttpStatus, Injectable, ValidationPipe as BaseValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'

import 'reflect-metadata'

@Injectable()
export class LocalizedValidationPipe extends BaseValidationPipe {
  public constructor() {
    super({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    })
  }

  public createExceptionFactory() {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    return (validationErrors: ValidationError[] = []) => validationErrors
  }
}
