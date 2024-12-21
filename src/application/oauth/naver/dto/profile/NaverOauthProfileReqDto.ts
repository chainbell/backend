/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class NaverOauthProfileReqDto {

	@ApiProperty({ description: '네이버 로그인 접근 토큰', example: '' })
	@IsString()
	readonly accessToken: string;


    @ApiProperty({ description: '네이버 로그인 시 사용하는 Auth header type', example: 'bearer' })
	@IsString()
	readonly tokenType: string;



}
