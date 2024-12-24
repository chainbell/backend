/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserNicknameResDto {

	@ApiProperty({ description: '사용자 닉네임', example: '팬치_1' })
	@IsString()
	readonly nickname: string;

	constructor(nickname: string) {
		this.nickname = nickname;
	}

	static of(nickname: string): UserNicknameResDto {

		return new UserNicknameResDto(nickname);

	}


}
