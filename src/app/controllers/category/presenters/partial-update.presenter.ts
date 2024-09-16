import { ApiProperty } from '@nestjs/swagger'

export class PartialUpdatePresenter {
  @ApiProperty()
  public result: boolean

  public constructor(data: PartialUpdatePresenter) {
    this.result = data.result
  }
}
