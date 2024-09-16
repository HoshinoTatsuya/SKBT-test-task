import { ValidationExceptionEnum } from '../../enums'
import { ExceptionType } from '../exception.type'

export type ValidationExceptionType = Record<keyof typeof ValidationExceptionEnum, ExceptionType>
