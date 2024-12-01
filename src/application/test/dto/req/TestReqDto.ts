/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TestReqDto {

  @ApiProperty({ description: 'Request string field', example: 'test-value' })
	@IsString()
  readonly strParam: string;

	@ApiProperty({ description: 'Request number field', example: 1 })
	@IsNumber()
	readonly numParam: number;

}
