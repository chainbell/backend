/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { redisStore } from 'cache-manager-redis-yet';

import { AppSchedulerModule } from './scheduler/app.scheduler.module';

import { CafeInfoModule } from './application/cafe/cafeInfo.module';
import { FaqModule } from './application/faq/faq.module';
import { QnaModule } from './application/qna/qna.module';
import { CreditModule } from './application/credit/credit.module';
import YamlConfig from './config/yaml/env.config';
import { WakzooMongoDbConfig } from './infra/mongodb/mongodb.module';
import { HomeModule } from './application/home/home.module';
import { OauthModule } from './application/oauth/oauth.module';
import { EncyclopediaModule } from './application/encyclopedia/encyclopedia.module';

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

    // MongoDbModule,
    WakzooMongoDbConfig,
    
    

    /* Domain 별 모듈 관리 */
    // TestModule,
    CafeInfoModule,
    FaqModule,
    QnaModule,
    CreditModule,
    HomeModule,
    OauthModule,
    EncyclopediaModule,

    /* Scheduler 설정 */
    AppSchedulerModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule { }
