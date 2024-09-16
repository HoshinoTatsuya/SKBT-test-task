import { DynamicModule, Global, Module, Type } from '@nestjs/common'
import { TypeOrmModule, TypeOrmOptionsFactory } from '@nestjs/typeorm'

import { CategoryEntity } from '../entities/category/category.entity'

import { CategoryRepository } from './category/category.repository'

@Global()
@Module({})
export class RepositoriesModule {
  public static register(options: Type<TypeOrmOptionsFactory>): DynamicModule {
    return {
      module: RepositoriesModule,
      imports: [TypeOrmModule.forRootAsync({ useClass: options }), TypeOrmModule.forFeature([CategoryEntity])],
      providers: [CategoryRepository],
      exports: [TypeOrmModule, CategoryRepository],
    }
  }
}
