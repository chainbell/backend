/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreditCategoryEntity } from "src/infra/wakzoolife/credit/creditCategory.entity";
import { CreditParticipantEntity } from "src/infra/wakzoolife/credit/CreditParticipant.entity";
import { Repository } from "typeorm";
import { CreditCategoryCode } from "./dto/code/CreditCategory.code";

@Injectable()
export class CreditService {

	constructor(
		@InjectRepository(CreditCategoryEntity)
		private readonly creditCategoryRepository: Repository<CreditCategoryEntity>,
		@InjectRepository(CreditParticipantEntity)
		private readonly creditParticipantRepository: Repository<CreditParticipantEntity>,
	) {}


	public async getCreditList(): Promise<CreditCategoryEntity[]> {

		console.log(CreditCategoryCode);
		return await this.creditCategoryRepository.find();
	}

	


}