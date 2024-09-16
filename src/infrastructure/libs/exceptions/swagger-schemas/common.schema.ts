import { CommonExceptionEnum } from '../enums'
import { badResponseSchemaFactory } from '../factories/bad-response-schema.factory'
import { commonExceptionEn } from '../translations'

export const commonSchemas = {
  [CommonExceptionEnum.INTERNAL_SERVER_ERROR]: badResponseSchemaFactory(commonExceptionEn.INTERNAL_SERVER_ERROR),
  [CommonExceptionEnum.BAD_REQUEST]: badResponseSchemaFactory(commonExceptionEn.BAD_REQUEST),
  [CommonExceptionEnum.UNKNOWN_ERROR]: badResponseSchemaFactory(commonExceptionEn.UNKNOWN_ERROR),
  [CommonExceptionEnum.DATA_DUPLICATION]: badResponseSchemaFactory(commonExceptionEn.DATA_DUPLICATION),
  [CommonExceptionEnum.VALIDATION]: badResponseSchemaFactory(commonExceptionEn.VALIDATION),
}
