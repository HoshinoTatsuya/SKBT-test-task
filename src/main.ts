//import { CustomGlobalSettings } from '@libs/shared/common/exceptions/global-settings/custom-global-settings'
import { INestApplication } from '@nestjs/common'
//import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { CustomGlobalSettings } from './infrastructure/libs/exceptions'
import { SwaggerConfigService } from './infrastructure/libs/swagger/config/swagger.config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  CustomGlobalSettings.createGlobalSettings<INestApplication>(app)

  const configService = new ConfigService()
  const swaggerConfigService = new SwaggerConfigService(configService)
  const swaggerConfig = swaggerConfigService.createSwaggerOptions()

  const swaggerDocument = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build()

  app.enableCors()

  app.setGlobalPrefix(configService.get<string>('MICROSERVICES_CATEGORY_ROUTE_PREFIX'), { exclude: [] })

  const document = SwaggerModule.createDocument(app, swaggerDocument)

  SwaggerModule.setup(`${swaggerConfig.routePrefix}/docs`, app, document)

  await app.listen(configService.get<number>('MICROSERVICES_CATEGORY_PORT'))
}

void bootstrap()
