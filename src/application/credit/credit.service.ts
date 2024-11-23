/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { CreditCategoryCode } from "./dto/code/CreditCategory.code";
import { InjectModel } from "@nestjs/mongoose";
import { CreditParticipant } from "src/infra/mongodb/credit/creditParticipant.schema";
import { Model } from "mongoose";

@Injectable()
export class CreditService {

	constructor(
		@InjectModel(CreditParticipant.name)
		private readonly creditParticipantModel: Model<CreditParticipant>,
		) {}


	public async getCreditList(): Promise<Record<string, string[]>>  {
		/**
		 * credit 전체 정보 조회
		 */
		const participants = await this.creditParticipantModel.find().sort({name:1}).exec();
  
		const groupedByCategory = participants.reduce((acc, participant) => {
			const category = participant.category;
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(participant.name);
			return acc;
		}, {} as Record<string, string[]>);

		return groupedByCategory;

	}

	public async addCreditParticipant(participantName: string, categoryCode:CreditCategoryCode): Promise<void> {
		/**
		 * credit Category 별 사용자 추가
		 */
		try{
			const participant = new this.creditParticipantModel({
        name : participantName,
        category : categoryCode,
      });
      await participant.save();
		} catch(e){
			console.log(e);
		}
	}

}
