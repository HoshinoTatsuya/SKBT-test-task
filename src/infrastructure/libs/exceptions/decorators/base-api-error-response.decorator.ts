import { applyDecorators } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { ApiUnprocessableEntityResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator'

import { BaseException } from '../base-exception'

// eslint-disable-next-line @typescript-eslint/naming-convention
export function BaseApiErrorResponse(): MethodDecorator {
  return applyDecorators(
    ApiResponse(BaseException.commonSchema.INTERNAL_SERVER_ERROR),
    ApiUnprocessableEntityResponse(BaseException.commonSchema.VALIDATION),
  )
}
