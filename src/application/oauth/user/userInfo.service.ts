/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { v4 as uuidv4 } from 'uuid';
import { ScreenType } from "./dto/code/ScreenType.code copy";
import { UserInfo } from "src/infra/mongodb/oauth/userInfo.schema";
import { Model } from "mongoose";
import { NaverOauthService } from "../naver/oauthNaver.service";
import { UserOauthType } from "./dto/code/UserOauthType.code";


@Injectable()
export class UserInfoService {

	constructor(
		@InjectModel(UserInfo.name) private readonly userInfoModel: Model<UserInfo>,
		private readonly naverOauthService: NaverOauthService,
	) {

	}

	public async initUser(oauthType: string, oauthId: string, nickname: string): Promise<void> {

		// 1. 중복 검증 
		const userInfo = await this.getUserInfo(oauthType, oauthId);
		if (userInfo == null) {
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

	public async getUserInfo(oauthType: string, accessToken: string): Promise<UserInfo> {
		/**
		 * Oauth 정보로 사용자 정보 조회
		 * 	oauthType = NAVER, GOOGLE
		 */

		const userInfo = null;

		if (oauthType === UserOauthType.NAVER) {
			this.getNaverUserInfo(accessToken);
		}
		else if (oauthType === UserOauthType.GOOGLE) {
			this.getGoogleUserInfo(accessToken);
		}

		return userInfo;

	}

	public async getNaverUserInfo(accessToken: string): Promise<UserInfo> {
		// 1. oauth 정보로 사용자 정보 조회
		const naverProfile = await this.naverOauthService.getNaverProfile('Bearer', accessToken);
		if (naverProfile == null) {
			return null;
		}

		// 2. oauthId로 DB 사용자 정보 조회
		const userInfo = this.userInfoModel.findOne({ _id: naverProfile.id }).exec();
		if (userInfo == null) {
			return null;
		}
	}

	public async getGoogleUserInfo(accessToken: string): Promise<UserInfo> {
		// 추후 구현 예정
		return null;
	}

	public async setNickName(oauthType: string, oauthId: string, nickname: string): Promise<boolean> {
		try {
			// 1. 회원 정보 조회 
			const userInfo = await this.getUserInfo(oauthType, oauthId);
			if (userInfo == null) {
				return false;
			}

			// 2. 닉네임 수정
			userInfo.nickname = nickname;
			const result = await userInfo.save();
			if (result == null) {
				return false;
			}
			return true;
		}
		catch (e) {

			return false;
		}
		
	}


}