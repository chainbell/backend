/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NaverOauthController } from './naver/oauthNaver.controller';
import { NaverOauthService } from './naver/oauthNaver.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { OauthNaverUser, OauthNaverUserSchema } from 'src/infra/mongodb/oauth/oauthNaverUser.schema';
import { UserInfo, UserInfoSchema } from 'src/infra/mongodb/oauth/userInfo.schema';
import { UserInfoService } from './user/service/userInfo.service';
import { UserInfoNickNameController } from './user/controller/userInfoNickName.controller';
import { UserSettingController } from './user/controller/userSetting.controller';
import { UserJoinController } from './user/controller/user.controller';
import { WithdrawReasonController } from './withdraw/controller/withdrawReason.controller';
import { WithdrawInfo, WithdrawInfoSchema } from 'src/infra/mongodb/withdraw/withdrawInfo.schema';
import { WithdrawService } from './withdraw/service/withdraw.service';
import { UserWithdrawService } from './user/service/userWithdraw.service';


@Module({
  imports: [HttpModule,
    MongooseModule.forFeature(
      [
        { name: OauthNaverUser.name, schema: OauthNaverUserSchema },
        { name: UserInfo.name, schema: UserInfoSchema },
        { name: WithdrawInfo.name, schema: WithdrawInfoSchema },
      ]
    ),
  ],
  controllers: [NaverOauthController, UserInfoNickNameController, UserSettingController, UserJoinController, WithdrawReasonController],
  providers: [NaverOauthService, UserInfoService, WithdrawService, UserWithdrawService],
  exports: [UserInfoService],
})
export class OauthModule {}
