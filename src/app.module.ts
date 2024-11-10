/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';

import { AppSchedulerModule } from './scheduler/app.scheduler.module';

import { TestModule } from './application/test/test.module';
import { CafeInfoModule } from './application/cafe/cafeInfo.module';
import { FaqModule } from './application/faq/faq.module';
import { QnaModule } from './application/qna/qna.module';
import { CreditModule } from './application/credit/credit.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getWakZooDbConfig } from './config/db/typeorm.module';
import YamlConfig from './config/yaml/env.config';
@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      load: [YamlConfig],
      envFilePath: [
        `.env.${process.env.NODE_ENV}`,
        '.env'],
    }),

    process.env.ENABLE_REDIS === '1'
      ? CacheModule.register({
          isGlobal: true,

          store: redisStore,
          url: process.env.REDIS_URI,
        })
      : CacheModule.register({
          isGlobal: true,
        }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getWakZooDbConfig,
    }),

    /* Domain 별 모듈 관리 */
    TestModule,
    CafeInfoModule,
    FaqModule,
    QnaModule,
    CreditModule,

    /* Scheduler 설정 */
    AppSchedulerModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
