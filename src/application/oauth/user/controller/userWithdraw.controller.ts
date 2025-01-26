/* eslint-disable prettier/prettier */

import { Body, Controller, Headers, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiOAuthHeaders } from "src/common/annotation/oauth.annotation";
import { UserWithdrawReasonReqDto } from "../dto/req/UserWithdrawReasonReqDto";
import { UserInfoService } from "../service/userInfo.service";
import { UserWithdrawService } from "../service/userWithdraw.service";


@ApiTags('사용자 탈퇴 사유 관련 요청 API (Authorize 필요)')
@Controller('/api/v1/user/withdraw')
@ApiOAuthHeaders()
export class UserWithdrawController {

    constructor(
        private readonly userInfoService: UserInfoService,
        private readonly userWithdrawService: UserWithdrawService,
    ) { }


    @Post('')
    @ApiOperation({ summary: '회원 탈퇴 사유 저장', description: '회원 탈퇴 사유 저장' })
    @ApiResponse({ status: 200, description: '저장 성공 여부 반환', type: Boolean })
    async post(@Headers('oauthType') oauthType, @Headers('accessToken') accessToken, @Body() param: UserWithdrawReasonReqDto): Promise<boolean> {
        
        // 1. 사용자 정보 조회
        const userInfo = await this.userInfoService.getUserInfo(oauthType, accessToken);
        

        // 2. 사용자 탈퇴 사유 저장
        const result = await this.userWithdrawService.saveUserWithdrawReason(userInfo._id, param.withdrawId);

        return result;
    }



}