import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator'

import { defaultPage, defaultPageSize, maxPage, maxPageSize, minPage, minPageSize } from './default-settings'

export class PaginationDto {
  @IsInt()
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  @Max(maxPageSize)
  @Min(minPageSize)
  @IsNotEmpty()
  @Transform((val) => Number(val.value))
  @IsOptional()
  @ApiProperty({
    required: false,
    default: defaultPageSize,
    description: `default value is ${defaultPageSize}`,
    example: defaultPageSize,
  })
  public readonly pageSize: number = defaultPageSize

  @Max(maxPage)
  @Min(minPage)
  @IsInt()
  @IsNotEmpty()
  @Transform((val) => Number(val.value))
  @IsOptional()
  @ApiProperty({
    required: false,
    default: defaultPage,
    description: 'default value is 0',
    example: defaultPage,
  })
  public readonly page: number = 0
}
