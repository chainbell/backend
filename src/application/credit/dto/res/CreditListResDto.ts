/* eslint-disable prettier/prettier */

import { CreditResDto } from "./CreditResDto";


export class CreditListResDto {

	credits: CreditResDto[];

	constructor(credits: CreditResDto[]) {
		this.credits = credits;
	}

	static from(credits: CreditResDto[]): CreditListResDto {
		return new CreditListResDto(credits);
	}

}