/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ScrapUtil } from '../../common/util/scrap.util';
import { ConfigService } from '@nestjs/config';
import { WakzooJoinedUserCount } from 'src/infra/mongodb/wakzoo/wakzooJoinedUserCount.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WakzooJoinedUserCountType } from './dto/code/WakzooJoinedUserCountType.code';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

/**
 * Service for getting information about the wakzoo cafe.
 */
@Injectable()
export class CafeInfoService {

	wakzoocafe: string;

	constructor(
		private readonly configService: ConfigService,
		private readonly httpService: HttpService,
		@InjectModel(WakzooJoinedUserCount.name) private readonly wakzooJoinedUserCountModel: Model<WakzooJoinedUserCount>,
	) {
		this.wakzoocafe = this.configService.get<string>('wakzoo.cafe-domain');
	}

	async setCafeJoinedUserCount(type: string): Promise<number> {

		const joinedUserCount = await this.getWakzooCafeJoinedUserCount();

		this.wakzooJoinedUserCountModel.create({ count: joinedUserCount, type: type });
		return joinedUserCount;
	}

	async getCombinedCafeJoinedUserCount(): Promise<Record<string, number>> {

		// 1. 자정 가입자 수 조회
		const stdCount = await this.getCafeJoinedUserCount(WakzooJoinedUserCountType.STANDARD);

		// 2. 최근 가입자 수 조회
		const recentCount = await this.getCafeJoinedUserCount(WakzooJoinedUserCountType.RECENT);

		// 3. 반환 객체 생성 및 반환

		const result: Record<string, number> = {
			standard: stdCount,
			recent: recentCount
		}

		return result;
	}

	async getCafeJoinedUserCount(type: string): Promise<number> {

		let result = 0;
		try {
			console.log('type:', type);
			const joinedUserCount = await this.wakzooJoinedUserCountModel.find({ type: type }).sort({ savedAt: -1 }).limit(1).exec();
			if (joinedUserCount.length === 0) {
				result = await this.setCafeJoinedUserCount(type);
			}
			else {
				result = joinedUserCount[0].count
			}
			return result;
		}
		catch (e) {
			result = await this.setCafeJoinedUserCount(type);
			return result;
		}

	}


	private async getWakzooCafeJoinedUserCount(): Promise<number> {
		try {
			const url = 'https://apis.naver.com/cafe-web/cafe2/CafeGateInfo.json?cluburl=steamindiegame';
			const response = await firstValueFrom(
				this.httpService.get(url)
			);
			return parseInt(response.data.message.result.memberCount);
		} catch (error) {
			return 0;
		}
	}



}