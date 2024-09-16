import { CommonExceptionEnum } from '../../enums'
import { ExceptionType } from '../exception.type'

export type CommonExceptionType = Record<keyof typeof CommonExceptionEnum, ExceptionType>
