/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ScreenType } from "../code/ScreenType.code";

export class UserScreenTypeReqDto {

	@ApiProperty({ description: 'Screen 모드(LIGHT, DARK, SYSTEM) 설정', example: ScreenType.LIGHT })
	@IsString()
	@IsNotEmpty()
	readonly screenType: ScreenType;




}
