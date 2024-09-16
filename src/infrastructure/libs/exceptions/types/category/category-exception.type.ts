import { CategoryExceptionEnum } from '../../enums'
import { ExceptionType } from '../exception.type'

export type CategoryExceptionType = Record<keyof typeof CategoryExceptionEnum, ExceptionType>
