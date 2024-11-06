/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';

import { AppController } from './app.controller';
import { CommonUtilModule } from './common/util/util.module';
import { AppSchedulerModule } from './scheduler/app.scheduler.module';

import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
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

    /* Domain 별 모듈 관리 */
    ApplicationModule,

    /* 공통 모듈 관리 */
    CommonUtilModule,

    /* Scheduler 설정 */
    AppSchedulerModule,
  ],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
