/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { UserOauthType } from "../code/UserOauthType.code";

export class UserInfoReqDto {

	@ApiProperty({ description: '사용할 Oauth 서비스', example: UserOauthType.NAVER })
	@IsString()
	readonly oauthType: UserOauthType;


    @ApiProperty({ description: '사용할 Oauth token', example: '' })
	@IsString()
	readonly acceessToken: string;



}
