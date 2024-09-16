import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CategoryModule } from './app/modules/category.module'
import { RepositoriesModule } from './app/repositories/repositories.module'
import { configOptions } from './infrastructure/config'
import { TypeOrmConfigService } from './infrastructure/config/typeorm.config'

@Module({
  imports: [ConfigModule.forRoot(configOptions), RepositoriesModule.register(TypeOrmConfigService), CategoryModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
