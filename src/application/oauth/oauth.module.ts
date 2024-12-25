/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NaverOauthController } from './naver/oauthNaver.controller';
import { NaverOauthService } from './naver/oauthNaver.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { OauthNaverUser, OauthNaverUserSchema } from 'src/infra/mongodb/oauth/oauthNaverUser.schema';
import { UserInfo, UserInfoSchema } from 'src/infra/mongodb/oauth/userInfo.schema';
import { UserInfoService } from './user/userInfo.service';
import { UserInfoNickNameController } from './user/userInfoNickName.controller';


@Module({
  imports: [HttpModule,
    MongooseModule.forFeature(
      [
        { name: OauthNaverUser.name, schema: OauthNaverUserSchema },
        { name: UserInfo.name, schema: UserInfoSchema }
      ]
    ),
  ],
  controllers: [NaverOauthController, UserInfoNickNameController],
  providers: [NaverOauthService, UserInfoService],
  exports: [UserInfoService],
})
export class OauthModule {}
