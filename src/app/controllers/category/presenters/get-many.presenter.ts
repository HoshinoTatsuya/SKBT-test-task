import { ApiProperty } from '@nestjs/swagger'

import { BaseCategoryPresenter } from './base-category.presenter'

export class GetManyPresenter {
  @ApiProperty({ type: [BaseCategoryPresenter] })
  public items: BaseCategoryPresenter[]

  @ApiProperty()
  public totals: number
}
