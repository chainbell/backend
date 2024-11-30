/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";

@Injectable()
export class HomeService {

	constructor(
	
		) {}


	public async getCreditList(): Promise<Record<string, string[]>>  {
		return null;
	}


}
