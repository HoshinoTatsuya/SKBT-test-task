import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import {
  IsAlphaWithMultipleLocalesDecorator,
  IsArgumentBooleanDecorator,
} from '../../../../infrastructure/libs/custom-decorators'
import { BooleanUtils } from '../../../../infrastructure/libs/utils/boolean.utils'
import {
  activeDescription,
  categoryDescription,
  categoryDescriptionExample,
  categoryNameExample,
  categorySlugExample,
  isAlphaLanguage,
  maxStringLength,
  nameDescription,
  slugDescription,
} from '../../../constants/category'
import { SupportLanguageEnum } from '../../../enums/support-language.enum'

export class CreateDto {
  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator([isAlphaLanguage.EN], [SupportLanguageEnum.EN])
  @IsNotEmpty()
  @Transform((params) => params.value.trim().toLowerCase())
  @ApiProperty({
    description: slugDescription,
    required: true,
    example: categorySlugExample,
  })
  public slug: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @IsNotEmpty()
  @Transform((params) => params.value.trim().toLowerCase())
  @ApiProperty({
    description: nameDescription,
    required: true,
    example: categoryNameExample,
  })
  public name: string

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
  @IsNotEmpty()
  @ApiProperty({
    description: activeDescription,
    required: true,
    example: true,
  })
  public active: boolean
}
