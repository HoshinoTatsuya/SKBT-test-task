import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator'

import { IsAlphaWithMultipleLocalesDecorator } from '../../../../infrastructure/libs/custom-decorators'
import { uuidV4Example } from '../../../common/constants'
import {
  categorySlugExample,
  isAlphaLanguage,
  maxStringLength,
  slugDescription,
  uuidV4,
} from '../../../constants/category'
import { SupportLanguageEnum } from '../../../enums/support-language.enum'

export class GetOneDto {
  @IsString()
  @IsOptional()
  @IsUUID(uuidV4)
  @ApiProperty({
    required: false,
    example: uuidV4Example,
  })
  public id?: string

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
}
