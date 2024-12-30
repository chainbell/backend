/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Put, Query, Headers, UseInterceptors, Header, HttpException, HttpStatus } from "@nestjs/common";
import { ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserInfoService } from "../service/userInfo.service";
import { UserNickNameReqDto } from "../dto/req/UserNickNameReqDto";
import { ApiOAuthHeaders } from "src/common/annotation/oauth.annotation";
import { UserInfoResDto } from "../dto/res/UserInfoResDto";
import { ScreenType } from "../dto/code/ScreenType.code";


@ApiTags('사용자 닉네임 API (Authorize 필요)')
@Controller('/api/v1/user/info/nickname')
@ApiOAuthHeaders()
export class UserInfoNickNameController {

    constructor(
        private readonly userInfoService: UserInfoService,
    ) { }


    @Get('')
    @ApiResponse({ status: 200, description: '사용자 닉네임 조회', type: UserInfoResDto })
    async get(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken): Promise<UserInfoResDto> {

        const userInfo = await this.userInfoService.getUserInfo(oauthType, accessToken);
        if (userInfo == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return UserInfoResDto.of(userInfo.nickname, userInfo.setting.pushAlarmFlag, ScreenType[userInfo.setting.screenType]);
    }

    @Put('')
    @ApiResponse({ status: 200, description: '사용자 닉네임 수정', type: UserInfoResDto })
    async post(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken, @Body() param: UserNickNameReqDto): Promise<UserInfoResDto> {
        const userInfo = await this.userInfoService.setNickName(oauthType, accessToken, param.nickname);
        if (userInfo == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return UserInfoResDto.of(userInfo.nickname, userInfo.setting.pushAlarmFlag, ScreenType[userInfo.setting.screenType]);
    }


}
