/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Put, Query, Headers, UseInterceptors, Param, HttpException, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserInfoService } from "../service/userInfo.service";
import { UserPushReqDto } from "../dto/req/UserPushReqDto";
import { UserScreenTypeReqDto } from "../dto/req/UserScreenTypeDto";
import { ApiOAuthHeaders } from "src/common/annotation/oauth.annotation";
import { UserInfoResDto } from "../dto/res/UserInfoResDto";
import { ScreenType } from "../dto/code/ScreenType.code";


@ApiTags('사용자 설정 API (Authorize 필요)')
@Controller('/api/v1/user/setting')
@ApiOAuthHeaders()
export class UserSettingController {

    constructor(
        private readonly userInfoService: UserInfoService,
    ) { }


    @Put('/push')
    @ApiOperation({ summary: '사용자 푸시 알림 설정', description: '사용자의 푸시 알림 설정을 변경합니다.' })
    @ApiResponse({ status: 200, description: '설정 여부 반환', type: UserInfoResDto })
    async get(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken, @Body() param: UserPushReqDto): Promise<UserInfoResDto> {
        const userInfo = await this.userInfoService.setPushAlarmFlag(oauthType, accessToken, param.pushAlarmFlag);
        if (userInfo == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return UserInfoResDto.of(userInfo.nickname, userInfo.setting.pushAlarmFlag, ScreenType[userInfo.setting.screenType]);

    }

    @Put('/screenType')
    @ApiOperation({ summary: '사용자 화면 타입 설정', description: '사용자의 화면 타입 설정을 변경합니다.' })
    @ApiResponse({ status: 200, description: '설정 여부 반환', type: UserInfoResDto })
    async post(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken, @Body() param: UserScreenTypeReqDto): Promise<UserInfoResDto> {
        const userInfo = await this.userInfoService.setScreenType(oauthType, accessToken, param.screenType);
        if (userInfo == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return UserInfoResDto.of(userInfo.nickname, userInfo.setting.pushAlarmFlag, ScreenType[userInfo.setting.screenType]);
    }


}