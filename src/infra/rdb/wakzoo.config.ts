/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,  
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],  
      inject: [ConfigService],  
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('WAKZOO_DB_HOST'),  
        port: configService.get<number>('WAKZOO_DB_PORT'),  
        username: configService.get<string>('WAKZOO_DB_USER'),  
        password: configService.get<string>('WAKZOO_DB_PASSWORD'),  
        database: configService.get<string>('WAKZOO_DB_NAME'),  
        entities: [__dirname + '/**/*.entity.ts'],
        synchronize: configService.get<boolean>('RDB_SYCHRONIZE'), 
      }),
    }),
  ],
})
export class WakzooDatabaseModule {}