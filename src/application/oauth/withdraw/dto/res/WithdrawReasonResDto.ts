/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class WithdrawReasonResDto {

    @ApiProperty({ description: '사용자 닉네임', example: 'foeinao392nfodka2' })
    @IsString()
    readonly withdrawId: string;

    @ApiProperty({ description: '알림 설정', example: '탈퇴 사유' })
    @IsString()
    readonly withdrawReason: string;



    constructor(id: string, withdrawReason: string) {
        this.withdrawId = id;
        this.withdrawReason = withdrawReason;
  
    }

    static of(id: string, withdrawReason: string): WithdrawReasonResDto {
        return new WithdrawReasonResDto(id, withdrawReason);
    }

}
