/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class WithdrawReasonAddReqDto {

    @ApiProperty({ description: '저장 및 사용할 회원 탈퇴 사유', example: '탈왁 합니다.' })
	@IsString()
	readonly reason: string;



}
