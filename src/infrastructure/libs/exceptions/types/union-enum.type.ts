import { CategoryExceptionEnum, CommonExceptionEnum, ValidationExceptionEnum } from '../enums'

export type UnionEnumType = typeof CategoryExceptionEnum | typeof CommonExceptionEnum | typeof ValidationExceptionEnum
