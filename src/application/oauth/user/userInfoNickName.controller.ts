/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Put, Query, Headers, UseInterceptors } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserInfoService } from "./userInfo.service";
import { UserInfoReqDto } from "./dto/req/UserInfoReqDto";
import { UserNicknameResDto } from "./dto/res/UserNicknameResDto";
import { UserNickNameReqDto } from "./dto/req/UserNickNameReqDto";
import { OauthInterceptor } from "src/common/interceptors/oauth.interceptor";


@ApiTags('사용자 정보 API')
@Controller('/api/v1/user/info/nickname')
@UseInterceptors(OauthInterceptor)
export class UserInfoNickNameController {

    constructor(
        private readonly userInfoService: UserInfoService,
    ) { }


    @Get('')
    @ApiResponse({ status: 200, description: '사용자 닉네임 조회', type: UserNicknameResDto })
    async get(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken): Promise<UserNicknameResDto> {

        const userInfo = await this.userInfoService.getUserInfo(oauthType, accessToken);
        if (userInfo == null) {
            return null;
        }

        return UserNicknameResDto.of(userInfo.nickname);
    }

    @Put('')
    @ApiResponse({ status: 200, description: '사용자 닉네임 수정', type: UserNicknameResDto })
    async post(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken, @Body() param: UserNickNameReqDto): Promise<UserNicknameResDto> {
        this.userInfoService.setNickName(oauthType, accessToken, param.nickname);
        const userInfo = await this.userInfoService.getUserInfo(oauthType, accessToken);
        if (userInfo == null) {
            return null;
        }
        return UserNicknameResDto.of(userInfo.nickname);
    }


}