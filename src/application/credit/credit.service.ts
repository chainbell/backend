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
		private readonly creditParticipantRepository: Repository<CreditParticipantEntity>
		) {}


	public async getCreditList(): Promise<{ categoryName: string, participantName: string }[]> {
		/**
		 * credit 전체 정보 조회
		 */

		const queryData = await this.creditCategoryRepository.createQueryBuilder('cc')
            .innerJoinAndSelect(CreditParticipantEntity, 'cp', 'cc.code = cp.categoryCode')
            .select(['cc.categoryName as categoryName', 'cp.name as participantName'])
						.orderBy('cc.sort', 'ASC')
            .getRawMany();

		const result = queryData.map(row => ({
			categoryName: row['categoryName'],
			participantName: row['participantName'],
		}));

		return result
	}

	public async addCreditParticipant(participantName: string, categoryCode:CreditCategoryCode): Promise<void> {
		/**
		 * credit Category 별 사용자 추가 - 테스트 필요
		 */

		const categoryEntity = new CreditCategoryEntity();
		categoryEntity.code = categoryCode;
		
		const cateogryEntity = new CreditParticipantEntity();
		cateogryEntity.name = participantName;
		cateogryEntity.category = categoryEntity;

		this.creditParticipantRepository.save(cateogryEntity);
	}

	public deleteCreditParticipant(id: number): boolean {
		/**
		 * credit Category 별 사용자 삭제
		 */
		try {
			this.creditParticipantRepository.delete(id);
			return true;
		}
		catch (e) {
			return false;
		}
	}


	


}