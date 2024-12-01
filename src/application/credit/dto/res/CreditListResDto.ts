/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { CreditResDto } from "./CreditResDto";



export class CreditListResDto {

	@ApiProperty({ description: 'Credit 정보' })
	credits: CreditResDto[];

	constructor(credits: CreditResDto[]) {
		this.credits = credits;
	}

	static from(credits: CreditResDto[]): CreditListResDto {
		return new CreditListResDto(credits);
	}

}