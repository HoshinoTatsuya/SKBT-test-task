import { ApiResponseOptions } from '@nestjs/swagger'

import { ExceptionType } from '../types'

export function badResponseSchemaFactory(exception: ExceptionType): ApiResponseOptions {
  return {
    status: exception.code,
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: exception.code },
        message: { type: 'string', example: exception.message },
        description: { type: 'string', example: exception.description },
        errorName: { type: 'string', example: exception.errorName },
      },
    },
  }
}
