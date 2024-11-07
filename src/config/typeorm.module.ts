/* eslint-disable prettier/prettier */

import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const getWakZooDbConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('WAKZOO_DB_HOST'),
  port: +configService.get<number>('WAKZOO_DB_PORT'),
  username: configService.get<string>('WAKZOO_DB_USER'),
  password: configService.get<string>('WAKZOO_DB_PASSWORD'),
  database: configService.get<string>('WAKZOO_DB_NAME'),
  entities: [__dirname + '/../infra/wakzoolife/*.entity{.ts,.js}'],
  synchronize: true,
});