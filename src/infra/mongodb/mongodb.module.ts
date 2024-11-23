/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // ConfigModule 추가
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('datasource.mongodb.wakzoolife.host'),
      }),
    }),
  ],
  exports: [MongooseModule], // MongooseModule을 export
})
export class WakzooMongoDbConfig {}