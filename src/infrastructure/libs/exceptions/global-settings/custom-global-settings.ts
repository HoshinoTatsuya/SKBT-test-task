import { INestApplication, INestMicroservice } from '@nestjs/common'

import { GlobalExceptionFilter } from '../filters'
import { LocalizedValidationPipe } from '../pipes'

export class CustomGlobalSettings {
  public static createGlobalSettings<T extends INestApplication | INestMicroservice>(app: T): T {
    app.useGlobalFilters(new GlobalExceptionFilter())
    app.useGlobalPipes(new LocalizedValidationPipe())

    return app
  }
}
