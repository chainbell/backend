/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from 'src/infra/wakzoolife/test.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TestService {

	constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {}

	public async getTestValue(strParam: string): Promise<string> {

		console.log(">>>>>>");
		console.log(__dirname);
		const result = await this.testRepository.find();
		console.log(result);

		
    return strParam;
	}

	public postTestValue(strParam: string): string {
		return strParam;
	}
}