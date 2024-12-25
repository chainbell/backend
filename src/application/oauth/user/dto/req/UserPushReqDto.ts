/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserPushReqDto {

	@ApiProperty({ description: 'Push Noti 설정', example: true })
	@IsString()
	@IsNotEmpty()
	readonly pushAlarmFlag: boolean;




}
