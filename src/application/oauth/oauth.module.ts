/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NaverOauthController } from './naver/oauthNaver.controller';
import { NaverOauthService } from './naver/oauthNaver.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { OauthNaverUser, OauthNaverUserSchema } from 'src/infra/mongodb/oauth/oauthNaverUser.schema';


@Module({
  imports: [HttpModule,
    MongooseModule.forFeature(
      [{ name: OauthNaverUser.name, schema: OauthNaverUserSchema }]
    ),
  ],
  controllers: [NaverOauthController],
  providers: [NaverOauthService],
})
export class OauthModule {}
