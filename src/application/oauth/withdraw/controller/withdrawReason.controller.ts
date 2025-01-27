/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { WithdrawService } from "../service/withdraw.service";
import { WithdrawReasonAddReqDto } from "../dto/req/WithdrawReasonAddReqDto";
import { WithdrawReasonResDto } from "../dto/res/WithdrawReasonResDto";



@ApiTags('회원 탈퇴 사유 API')
@Controller('/api/v1/withdraw/reason')
export class WithdrawReasonController {

    constructor(
        private readonly withdrawService: WithdrawService,
    ) { }

    @Get('')
    @ApiOperation({ summary: '회원 탈퇴 사유 목록 조회', description: '회원 탈퇴 시 설문 조사용 탈퇴 사유 목록 조회' })
    @ApiResponse({ status: 200, description: '회원 탈퇴 사유 목록 반환', type: [WithdrawReasonResDto] })
    async withdraw(): Promise<WithdrawReasonResDto[]> {

        const withdrawReason = await this.withdrawService.getWithdrawInfo();

        const result: WithdrawReasonResDto[] = [];
        for (let i = 0; i < withdrawReason.length; i++) {
            result.push(WithdrawReasonResDto.of(withdrawReason[i].id, withdrawReason[i].reason));
        }
        return result;
    }

    @Post('')
    @ApiOperation({ summary: '회원 탈퇴 사유 추가하기', description: '회원 탈퇴 사유 목록에 신규 항목을 추가(관리자용)' })
    @ApiResponse({ status: 200, description: '사유 추가 성공 여부 반환', type: Boolean })
    async addWithdraw(@Body() param: WithdrawReasonAddReqDto): Promise<boolean> {
        return await this.withdrawService.addWithdrawReason(param.reason);
    }


}