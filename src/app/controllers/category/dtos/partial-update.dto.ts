import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

import {
  IsAlphaWithMultipleLocalesDecorator,
  IsArgumentBooleanDecorator,
} from '../../../../infrastructure/libs/custom-decorators'
import { BooleanUtils } from '../../../../infrastructure/libs/utils/boolean.utils'
import { uuidV4Example } from '../../../common/constants'
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
  uuidV4,
} from '../../../constants/category'
import { SupportLanguageEnum } from '../../../enums/support-language.enum'

export class PartialUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(uuidV4)
  @ApiProperty({
    required: true,
    example: uuidV4Example,
  })
  public id: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator([isAlphaLanguage.EN], [SupportLanguageEnum.EN])
  @IsOptional()
  @Transform((params) => params.value.trim().toLowerCase())
  @ApiProperty({
    description: slugDescription,
    required: false,
    example: categorySlugExample,
  })
  public slug?: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @IsOptional()
  @Transform((params) => params.value.trim().toLowerCase())
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
}
