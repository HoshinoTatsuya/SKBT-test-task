import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_DEFAULT_HOST || 'localhost',
  port: +process.env.DATABASE_DEFAULT_PORT || 5432,
  username: process.env.DATABASE_DEFAULT_USERNAME || 'testUserName',
  password: process.env.DATABASE_DEFAULT_PASSWORD || 'DemoPassword',
  database: process.env.DATABASE_MS_CATEGORY_NAME,
  synchronize: process.env.APP_NAME !== 'prod',
  entities: ['src/app/entities/**/*.entity{.ts,.js}'],
  migrations: ['src/app/entities/migrations/**/*.entity{.ts,.js}'],
  subscribers: ['src/app/entities/subscribers/**/*.subscriber{.ts,.js}'],
})
