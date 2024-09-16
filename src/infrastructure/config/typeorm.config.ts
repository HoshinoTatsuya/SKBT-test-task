import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { BooleanUtils } from '../libs/utils/boolean.utils'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public constructor(private readonly _configService: ConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const typeOrmOptions = {
      name: this._configService.get<string>('DATABASE_MS_CATEGORY_NAME', undefined),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: this._configService.get<any>('DATABASE_DEFAULT_TYPE', undefined),
      host: this._configService.get<string>('DATABASE_DEFAULT_HOST', undefined),
      port: Number(this._configService.get<number>('DATABASE_DEFAULT_PORT', undefined)),
      username: this._configService.get<string>('DATABASE_DEFAULT_USERNAME', undefined),
      password: this._configService.get<string>('DATABASE_DEFAULT_PASSWORD', undefined),
      database: this._configService.get<string>('DATABASE_MS_CATEGORY_NAME', undefined),
      debug: BooleanUtils.strToBoolWithDefault(
        this._configService.get<boolean>('DATABASE_MS_CATEGORY_DEBUG', undefined),
        undefined,
      ),
      logging: BooleanUtils.strToBoolWithDefault(
        this._configService.get<boolean>('DATABASE_MS_CATEGORY_LOGGING', undefined),
        undefined,
      ),
      autoLoadEntities: true,
      synchronize: this._configService.get('APP_NAME') !== 'prod',
      migrations: [__dirname + '/../../app/entities/migrations/**/*{.ts,.js}'],
      subscribers: [__dirname + '/../../app/entities/subscribers/**/*.subscriber{.ts,.js}'],
      migrationsRun: this._configService.get('DATABASE_DEFAULT_MIGRATIONS_RUN') !== 'prod',
      entities: [__dirname + '/../../app/entities/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
    }

    if (typeOrmOptions.name === undefined) {
      throw new Error('Name database is undefined on ms-category!')
    }

    if (typeOrmOptions.type === undefined) {
      throw new Error("Environment variable 'DATABASE_DEFAULT_TYPE' cannot be undefined on ms-category!")
    }

    if (typeOrmOptions.host === undefined) {
      throw new Error("Environment variable 'DATABASE_DEFAULT_HOST' cannot be undefined on ms-category!")
    }

    if (isNaN(typeOrmOptions.port)) {
      throw new Error("Environment variable 'DATABASE_DEFAULT_PORT' cannot be undefined on ms-category!")
    }

    if (typeOrmOptions.username === undefined) {
      throw new Error("Environment variable 'DATABASE_DEFAULT_USERNAME' cannot be undefined on ms-category!")
    }

    if (typeOrmOptions.password === undefined) {
      throw new Error("Environment variable 'DATABASE_DEFAULT_PASSWORD' cannot be undefined on ms-category!")
    }

    if (typeOrmOptions.database === undefined) {
      throw new Error("Environment variable 'DATABASE_MS_CATEGORY_NAME' cannot be undefined on ms-category!")
    }

    if (typeOrmOptions.debug === undefined) {
      throw new Error("Environment variable 'DATABASE_MS_CATEGORY_DEBUG' cannot be undefined on ms-category!")
    }

    if (typeOrmOptions.logging === undefined) {
      throw new Error("Environment variable 'DATABASE_MS_CATEGORY_LOGGING' cannot be undefined on ms-category!")
    }

    return typeOrmOptions
  }
}
