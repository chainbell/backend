/* eslint-disable prettier/prettier */

import { Controller, Get, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserInfoService } from "./userInfo.service";
import { UserInfoReqDto } from "./dto/req/UserInfoReqDto";
import { UserNicknameResDto } from "./dto/res/UserNicknameResDto";


@ApiTags('사용자 정보 API')
@Controller('/api/v1/user/info')
export class UserInfoController {

    constructor(
        private readonly userInfoService: UserInfoService,
    ) { }


    @Get('/nickname')
    @ApiResponse({ status: 200, description: '사용자 닉네임 조회', type: UserNicknameResDto })
    async get(@Query() param: UserInfoReqDto): Promise<UserNicknameResDto> {

        const userInfo = await this.userInfoService.getUserInfo(param.oauthType, param.acceessToken);
        if (userInfo == null) {
            return null;
        }

        return UserNicknameResDto.of(userInfo.nickname);
    }

}