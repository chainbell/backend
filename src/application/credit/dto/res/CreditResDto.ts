/* eslint-disable prettier/prettier */


export class CreditResDto {

	section: string;
	participants: string[];

	constructor(section: string, participants: string[]) {
		this.section = section;
		this.participants = participants;
	}

	static of(section:string, participants:string[]): CreditResDto {
		return new CreditResDto(section, participants);
	}

}
