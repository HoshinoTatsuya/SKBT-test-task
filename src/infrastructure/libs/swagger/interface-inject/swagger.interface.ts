import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'

export interface ISwaggerModuleOptionsFactory {
  title?: string
  description?: string
  version?: string
  routePrefix?: string
  path?: string
  persistAuthorization: boolean
  bearerAuth?: {
    type: string
    description: string
    name: string
    in: string
  }
}

export interface SwaggerModuleOptionsFactory {
  createSwaggerOptions(): Promise<ISwaggerModuleOptionsFactory> | ISwaggerModuleOptionsFactory
}

export interface SwaggerModuleOptions extends ISwaggerModuleOptionsFactory {
  isGlobal?: boolean
}

export interface SwaggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<SwaggerModuleOptionsFactory>
  useClass?: Type<SwaggerModuleOptionsFactory>
  useFactory?: (...args: any[]) => Promise<ISwaggerModuleOptionsFactory> | ISwaggerModuleOptionsFactory
  inject?: (InjectionToken | OptionalFactoryDependency)[]
  isGlobal?: boolean
}
