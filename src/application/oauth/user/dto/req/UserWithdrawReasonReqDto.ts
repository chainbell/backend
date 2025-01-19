/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserWithdrawReasonReqDto {

    @ApiProperty({ description: '탈퇴 사유 ID', example: '6783bd31deccd2582534578e' })
	@IsString()
	readonly withdrawId: string;



}
