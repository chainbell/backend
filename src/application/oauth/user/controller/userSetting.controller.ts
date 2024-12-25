/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Put, Query, Headers, UseInterceptors, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserInfoService } from "../service/userInfo.service";
import { OauthInterceptor } from "src/common/interceptors/oauth.interceptor";
import { UserPushReqDto } from "../dto/req/UserPushReqDto";
import { UserScreenTypeReqDto } from "../dto/req/UserScreenTypeDto";


@ApiTags('사용자 Setting API (Authorize 필요)')
@Controller('/api/v1/user/setting')
@UseInterceptors(OauthInterceptor)
export class UserSettingController {

    constructor(
        private readonly userInfoService: UserInfoService,
    ) { }


    @Put('/push')
    @ApiOperation({ summary: '사용자 푸시 알림 설정', description: '사용자의 푸시 알림 설정을 변경합니다.' })
    @ApiResponse({ status: 200, description: '설정 여부 반환', type: Boolean })
    async get(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken, @Body() param: UserPushReqDto): Promise<boolean> {
        return this.userInfoService.setPushAlarmFlag(oauthType, accessToken, param.pushAlarmFlag);;
    }

    @Put('/screenType')
    @ApiOperation({ summary: '사용자 화면 타입 설정', description: '사용자의 화면 타입 설정을 변경합니다.' })
    @ApiResponse({ status: 200, description: '설정 여부 반환', type: Boolean })
    async post(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken, @Body() param: UserScreenTypeReqDto): Promise<boolean> {
        return this.userInfoService.setScreenType(oauthType, accessToken, param.screenType);
    }


}