import { ConfigModuleOptions } from '@nestjs/config'

export const configOptions: ConfigModuleOptions = {
  envFilePath: 'config/local.env',
  isGlobal: true,
}
