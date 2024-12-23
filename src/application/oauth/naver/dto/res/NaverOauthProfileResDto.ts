/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class NaverOauthProfileResDto {

	@ApiProperty({ description: '네이버 닉네임', example: '' })
	@IsString()
	nickname: string;

	constructor(nickname: string) {
		this.nickname = nickname;
	}

	static of(nickname: string): NaverOauthProfileResDto {
		return new NaverOauthProfileResDto(nickname);
	}

}
