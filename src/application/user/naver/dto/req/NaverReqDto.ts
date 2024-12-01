/* eslint-disable prettier/prettier */

import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsString } from "class-validator";

@ApiTags('Naver OAuth API req DTO')
export class NaverReqDto {

	@ApiProperty({ description: '', example: '' })
	@IsString()
  readonly code: string;

	@ApiProperty({ description: '', example: '' })
	@IsString()
	readonly state: string;

}