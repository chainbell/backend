/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserOauthType } from "../code/UserOauthType.code";

export class UserInfoJoinReqDto {

    @ApiProperty({ description: '사용할 닉네임', example: 'test nickname' })
	@IsString()
	readonly nickname: string;



}
