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
		/**
		 * credit 전체 정보 조회
		 */
		return null;
	}

	private initCreditCategory(): void {
		/**
		 * credit Category 초기화
		 */
		Object.entries(CreditCategoryCode).forEach(([key, value]) => {
			
			const creditCategory = new CreditCategoryEntity();
			creditCategory.code = key;
			creditCategory.categoryName = value;
			
			this.creditCategoryRepository.save(creditCategory);

		});

	}

	public async addCreditParticipant(): Promise<void> {
		/**
		 * credit Category 별 사용자 추가
		 */
	}

	public deleteCreditParticipant(): void {
		/**
		 * credit Category 별 사용자 삭제
		 */
	}


	


}