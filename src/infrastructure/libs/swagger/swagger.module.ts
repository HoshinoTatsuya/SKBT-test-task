import { DynamicModule, Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'

import { SwaggerModuleAsyncOptions } from './interface-inject/swagger.interface'

@Module({})
export class SwaggerModule {
  public static forRootAsync(options: SwaggerModuleAsyncOptions): DynamicModule {
    return {
      module: SwaggerModule,
      imports: options.imports ?? [],
      controllers: [],
      providers: [],
      exports: [ClientsModule],
      global: options?.isGlobal ?? true,
    }
  }
}
