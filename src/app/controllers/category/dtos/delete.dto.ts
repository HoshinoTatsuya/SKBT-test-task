import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { uuidV4Example } from '../../../common/constants'
import { uuidV4 } from '../../../constants/category'

export class DeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(uuidV4)
  @ApiProperty({
    required: true,
    example: uuidV4Example,
  })
  public id: string
}
