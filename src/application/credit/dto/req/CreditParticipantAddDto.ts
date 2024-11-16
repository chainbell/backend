/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreditCategoryCode } from "../code/CreditCategory.code";

export class CreditParticipantAddDto {

	@ApiProperty({ description: 'Credit 등록 이름', example: 'MR. Kim' })
	@IsString()
	readonly name: string;

	@ApiProperty({ description: 'CreditCategoryCode', enum:CreditCategoryCode, example: 'DEVELOP' })
	@IsString()
	readonly category: CreditCategoryCode;

}
