/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';


@Injectable()
export class TestService {

	constructor(
  ) {}

	public async getTestValue(strParam: string): Promise<string> {

		
    return strParam;
	}

	public postTestValue(strParam: string): string {
		return strParam;
	}
}