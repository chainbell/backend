/* eslint-disable prettier/prettier */

import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { AxiosResponse } from "axios";
import { Model } from "mongoose";
import { lastValueFrom } from "rxjs";
import { OauthNaverUser } from "src/infra/mongodb/oauth/oauthNaverUser.schema";


@Injectable()
export class NaverOauthService {


	client_id: string;
	secret: string;
	state: string;
	redirect_url: string;

	naver_oauth_url: string;
	naver_open_api_url: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
		@InjectModel(OauthNaverUser.name)
		private readonly oauthNaverUserModel: Model<OauthNaverUser>,
	) {
		this.client_id = this.configService.get<string>('oauth.naver.client-id');
		this.secret = this.configService.get<string>('oauth.naver.secret');
		this.state = this.configService.get<string>('oauth.naver.state');
		this.redirect_url = this.configService.get<string>('oauth.naver.redirect-url');

		this.naver_oauth_url = 'https://nid.naver.com/oauth2.0';
		this.naver_open_api_url = 'https://openapi.naver.com/v1/nid/me';
	}

	public async issueNaverOauthToken(code: string, state: string): Promise<Record<string, string>> {
		/* naver oauth token 발급 (3.4.4 접근 토큰 발급 요청) */

		const url = this.naver_oauth_url + '/token';
		const params = new URLSearchParams({
			grant_type: 'authorization_code',
			client_id: this.client_id,
			client_secret: this.secret,
			code,
			state,
		});

		const response: AxiosResponse = await lastValueFrom(this.httpService.post(url, params.toString()));

		const result: Record<string, string> = {
			accessToken: response.data.access_token,
			refreshToken: response.data.refresh_token,
			tokenType: response.data.token_type,
			expiresIn: response.data.expires_in
		};

		return result;
	}

	public async getNaverProfile(tokenType: string, accessToken: string): Promise<Record<string, any>> {
		/*
		3.4.5 접근 토큰을 이용하여 프로필 API 호출하기
		https://openapi.naver.com/v1/nid/me
			HEADER
				Authorization : Bearer {access_token}
		:return:
			{
				'resultcode': '00',
				'message': 'success',
				'response':
				{
					'id': '고유식별키',
					'nickname': '닉네임'
				}
			}
		*/
		const headers = {
			Authorization: `${tokenType} ${accessToken}`,
		};

		const response: AxiosResponse = await lastValueFrom(
			this.httpService.get(this.naver_open_api_url, { headers }),
		);

		const result: Record<string, any> = {
			id: response.data.response.id,
			nickname: response.data.response.nickname,
		};

		return result;
	}

	
}
