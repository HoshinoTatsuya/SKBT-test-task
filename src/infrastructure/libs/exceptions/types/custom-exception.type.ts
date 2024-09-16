import { ExceptionType } from './exception.type'
import { UnionEnumType } from './union-enum.type'

export type CustomExceptionType = Record<keyof UnionEnumType, ExceptionType>
