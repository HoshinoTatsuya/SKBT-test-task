import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString, MaxLength } from 'class-validator'

import {
  IsAlphaWithMultipleLocalesDecorator,
  IsArgumentBooleanDecorator,
  SortCustomDecorator,
} from '../../../../infrastructure/libs/custom-decorators'
import { PaginationDto } from '../../../../infrastructure/libs/paginations/base-pagination.dto'
import { BooleanUtils } from '../../../../infrastructure/libs/utils/boolean.utils'
import {
  activeDescription,
  categoryDescription,
  categoryDescriptionExample,
  categoryNameExample,
  isAlphaLanguage,
  maxStringLength,
  nameDescription,
  searchDescription,
  searchExample,
  sortDescription,
  sortExample,
  sortRegExp,
} from '../../../constants/category'
import { SupportLanguageEnum } from '../../../enums/support-language.enum'

export class GetManyDto extends PaginationDto {
  @SortCustomDecorator(sortRegExp)
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: sortDescription,
    required: false,
    example: sortExample,
  })
  public sort?: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @Transform((params) => params.value.trim().toLowerCase())
  @IsOptional()
  @ApiProperty({
    description: nameDescription,
    required: false,
    example: categoryNameExample,
  })
  public name?: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @Transform((params) => params.value.trim().toLowerCase())
  @IsOptional()
  @ApiProperty({
    description: categoryDescription,
    required: false,
    example: categoryDescriptionExample,
  })
  public description?: string

  @Transform((val) => BooleanUtils.isArgumentTrue(val.value))
  @IsArgumentBooleanDecorator()
  @IsOptional()
  @ApiProperty({
    description: activeDescription,
    required: false,
    example: true,
  })
  public active?: boolean

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @Transform((params) => params.value.trim().toLowerCase())
  @IsOptional()
  @ApiProperty({
    description: searchDescription,
    required: false,
    example: searchExample,
  })
  public search?: string
}
