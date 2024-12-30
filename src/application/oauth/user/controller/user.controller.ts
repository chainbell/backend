/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Put, Query, Headers, UseInterceptors, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserInfoService } from "../service/userInfo.service";
import { UserOauthType } from "../dto/code/UserOauthType.code";
import { UserInfo } from "src/infra/mongodb/oauth/userInfo.schema";
import { UserInfoJoinReqDto } from "../dto/req/UserInfoJoinReq";


@ApiTags('(데이터 테스트용)사용자 가입 API')
@Controller('/api/v1/user/join')
export class UserJoinController {

    constructor(
        private readonly userInfoService: UserInfoService,
    ) { }

    @Get('')
    @ApiOperation({ summary: '사용자 조회', description: '사용자 정보 조회' })
    @ApiResponse({ status: 200, description: '사용자 정보 반환', type: UserInfo })
    async getUser(@Query('id') id: string): Promise<UserInfo> {
        const userInfo = this.userInfoService.getUserInfo(UserOauthType.SYSTEM, id);
        return userInfo;
    }


    @Post('')
    @ApiOperation({ summary: '사용자 등록', description: '테스트 사용자 정보 등록' })
    @ApiResponse({ status: 200, description: '설정 여부 반환', type: UserInfo })
    async initUser(@Body() param: UserInfoJoinReqDto): Promise<UserInfo> {

        const id = await this.userInfoService.initUser(UserOauthType.SYSTEM, 'test auth id', param.nickname);
        if(id == null) {
            return null;
        }
        const userInfo = this.userInfoService.getUserInfo(UserOauthType.SYSTEM, id);
        
        return userInfo;
    }
}