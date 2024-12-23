/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { v4 as uuidv4 } from 'uuid';
import { ScreenType } from "./dto/code/ScreenType.code copy";
import { UserInfo } from "src/infra/mongodb/oauth/userInfo.schema";
import { Model } from "mongoose";


@Injectable()
export class UserInfoService {

	constructor(
		@InjectModel(UserInfo.name)
		private readonly userInfoModel: Model<UserInfo>,
	) {

	}

	public async initNaverProfile(oauthType: string, oauthId: string, nickname: string): Promise<void> {

		// 1. 중복 검증 
		const userInfo = this.userInfoModel.findOne({ oauthId: oauthId }).exec();
		if (userInfo) {
			return;
		}
		
		// 2. 저장
		const newUserInfo = new this.userInfoModel({
			id: oauthType + uuidv4(),
			oauthType: oauthType,
			oauthId: oauthId,
			nickname: nickname,
			joinedAt: Date.now(),
			setting: {
				pushAlarmFlag: false,
				screenType: ScreenType.SYSTEM
			}
		});

		await newUserInfo.save();

	}




}