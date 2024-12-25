/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserNickNameReqDto {

	@ApiProperty({ description: '수정할 사용자 닉네임', example: '팬치_1' })
	@IsString()
	@IsNotEmpty()
	readonly nickname: string;




}
