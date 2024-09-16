import { ApiProperty } from '@nestjs/swagger'

export class DeletePresenter {
  @ApiProperty()
  public result: boolean

  public constructor(data: DeletePresenter) {
    this.result = data.result
  }
}
