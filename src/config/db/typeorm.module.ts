/* eslint-disable prettier/prettier */

import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const getWakZooDbConfig = (configService: ConfigService): TypeOrmModuleOptions => {

   return {
      type: 'mysql',
      host: configService.get<string>('datasource.wakzoolife.host'),
      port: +configService.get<number>('datasource.wakzoolife.port'),
      username: configService.get<string>('datasource.wakzoolife.username'),
      password: configService.get<string>('datasource.wakzoolife.password'),
      database: configService.get<string>('datasource.wakzoolife.database'),
      entities: [
        __dirname + '/../../infra/wakzoolife/*.entity{.ts,.js}', 
        __dirname + '/../../infra/wakzoolife/*/*.entity{.ts,.js}'
      ],
      synchronize: configService.get<boolean>('datasource.wakzoolife.synchronize'),
  };
  
};