/* eslint-disable prettier/prettier */


export class CreditResDto {
	
	categoryName: string;
	participantName: string[];

	constructor(section: string, participants: string[]) {
		this.categoryName = section;
		this.participantName = participants;
	}

	static of(section:string, participants:string[]): CreditResDto {
		return new CreditResDto(section, participants);
	}

}
