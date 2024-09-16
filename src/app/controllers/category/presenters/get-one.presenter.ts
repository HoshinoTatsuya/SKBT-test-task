import { ApiProperty } from '@nestjs/swagger'

import { uuidV4Example } from '../../../common/constants'
import {
  activeDescription,
  categoryDescription,
  categoryDescriptionExample,
  categoryNameExample,
  categorySlugExample,
  nameDescription,
  slugDescription,
} from '../../../constants/category'

export class GetOnePresenter {
  @ApiProperty({
    required: true,
    example: uuidV4Example,
  })
  public id: string

  @ApiProperty({
    required: true,
    example: new Date(),
  })
  public createdDate: Date

  @ApiProperty({
    description: slugDescription,
    required: true,
    example: categorySlugExample,
  })
  public slug: string

  @ApiProperty({
    description: nameDescription,
    required: true,
    example: categoryNameExample,
  })
  public name: string

  @ApiProperty({
    description: categoryDescription,
    required: false,
    example: categoryDescriptionExample,
  })
  public description?: string

  @ApiProperty({
    description: activeDescription,
    required: true,
    example: true,
  })
  public active: boolean

  public constructor(data: GetOnePresenter) {
    this.id = data.id
    this.createdDate = data.createdDate
    this.slug = data.slug
    this.name = data.name
    this.description = data.description
    this.active = data.active
  }
}
