/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class NaverOauthCallbackResDto {

	@ApiProperty({ description: '네이버 로그인 접근 토큰', example: '' })
	@IsString()
	readonly accessToken: string;


	@ApiProperty({ description: '네이버 로그인 접근 토큰 갱신용 토큰', example: '' })
	@IsString()
	readonly refreshToken: string;


	@ApiProperty({ description: '네이버 로그인 시 사용하는 Auth header type', example: 'bearer' })
	@IsString()
	readonly tokenType: string;


	@ApiProperty({ description: '만료 시간', example: '3600' })
	@IsString()
	readonly expiresIn: string;

	constructor(accessToken: string, refreshToken: string, tokenType: string, expiresIn: string) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.tokenType = tokenType;
		this.expiresIn = expiresIn;
	}

	static of(accessToken: string, refreshToken: string, tokenType: string, expiresIn: string): NaverOauthCallbackResDto {

		return new NaverOauthCallbackResDto(accessToken, refreshToken, tokenType, expiresIn);

	}


}
