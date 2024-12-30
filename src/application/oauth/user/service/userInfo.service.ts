/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { v4 as uuidv4 } from 'uuid';
import { ScreenType } from "../dto/code/ScreenType.code copy";
import { UserInfo } from "src/infra/mongodb/oauth/userInfo.schema";
import { Model } from "mongoose";
import { NaverOauthService } from "../../naver/oauthNaver.service";
import { UserOauthType } from "../dto/code/UserOauthType.code";


@Injectable()
export class UserInfoService {

	constructor(
		@InjectModel(UserInfo.name) private readonly userInfoModel: Model<UserInfo>,
		private readonly naverOauthService: NaverOauthService,
	) {

	}

	public async initUser(oauthType: string, oauthId: string, nickname: string): Promise<string> {

		/**
		 * 사용자 등록
		 * 	oauthType = NAVER, GOOGLE, SYSTEM
		 * 	oauthId = NAVER, GOOGLE : accessToken
		 * 	oauthId = SYSTEM : uuid
		 */
		try {
			// 1. 중복 검증 
			const userInfo = await this.getUserInfo(oauthType, oauthId);
			if (userInfo != null) {
				return;
			}

			// 2. 저장
			const id = uuidv4();
			const newUserInfo = new this.userInfoModel({
				_id: id,
				oauthType: oauthType,
				oauthId: id,
				nickname: nickname,
				joinedAt: Date.now(),
				setting: {
					pushAlarmFlag: false,
					screenType: ScreenType.SYSTEM
				}
			});

			await newUserInfo.save();

			return id;
		}
		catch (e) {
			console.log(e);
			return null;
		}

	}

	public async getUserInfo(oauthType: string, accessToken: string): Promise<UserInfo> {
		/**
		 * Oauth 정보로 사용자 정보 조회
		 * 	oauthType = NAVER, GOOGLE
		 */

		let userInfo = null;

		if (oauthType === UserOauthType.NAVER) {
			userInfo = this.getNaverUserInfo(accessToken);
		}
		else if (oauthType === UserOauthType.GOOGLE) {
			userInfo = this.getGoogleUserInfo(accessToken);
		}
		else {
			userInfo = this.getSystemUserInfo(accessToken);
		}

		return userInfo;

	}

	private async getNaverUserInfo(accessToken: string): Promise<UserInfo> {
		// 1. oauth 정보로 사용자 정보 조회
		const naverProfile = await this.naverOauthService.getNaverProfile('Bearer', accessToken);
		if (naverProfile == null) {
			return null;
		}

		// 2. oauthId로 DB 사용자 정보 조회
		return await this.userInfoModel.findOne({ oauthId: naverProfile.id, oauthType: UserOauthType.NAVER }).exec();
	}

	private async getGoogleUserInfo(accessToken: string): Promise<UserInfo> {
		// 추후 구현 예정
		return null;
	}

	private async getSystemUserInfo(id: string): Promise<UserInfo> {
		return await this.userInfoModel.findOne({ _id: id, oauthType: UserOauthType.SYSTEM }).exec();
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

	public async setPushAlarmFlag(oauthType: string, oauthId: string, pushAlarmFlag: boolean): Promise<boolean> {
		try {
			// 1. 회원 정보 조회 
			const userInfo = await this.getUserInfo(oauthType, oauthId);
			if (userInfo == null) {
				return false;
			}

			// 2. PushAlarmFlag 수정
			userInfo.setting.pushAlarmFlag = pushAlarmFlag;
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

	public async setScreenType(oauthType: string, oauthId: string, screenType: ScreenType): Promise<boolean> {
		try {
			// 1. 회원 정보 조회 
			const userInfo = await this.getUserInfo(oauthType, oauthId);
			if (userInfo == null) {
				return false;
			}

			// 2. ScreenType 수정
			userInfo.setting.screenType = screenType;
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