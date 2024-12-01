/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ScrapUtil } from '../../common/util/scrap.util';
import { ConfigService } from '@nestjs/config';
import { WakzooJoinedUserCount } from 'src/infra/mongodb/wakzoo/wakzooJoinedUserCount.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { get } from 'http';
import { WakzooJoinedUserCountType } from './dto/code/WakzooJoinedUserCountType.code';

/**
 * Service for getting information about the wakzoo cafe.
 */
@Injectable()
export class CafeInfoService {

	wakzoocafe: string;

	constructor(
		private readonly scrapUtil: ScrapUtil,
		private readonly configService: ConfigService,
		@InjectModel(WakzooJoinedUserCount.name) private readonly wakzooJoinedUserCountModel: Model<WakzooJoinedUserCount>,
	) {
		this.wakzoocafe = this.configService.get<string>('wakzoo.cafe-domain');
	}

	async setCafeJoinedUserCount(type: string): Promise<number> {

		const joinedUserCount = await this.scrapCafeJoinedUserCount();
		this.wakzooJoinedUserCountModel.create({ count: joinedUserCount, type: type });
		return joinedUserCount;
	}

	async getCombinedCafeJoinedUserCount(): Promise<Map<string, number>> {

		// 1. 자정 가입자 수 조회
		const stdCount = await this.getCafeJoinedUserCount(WakzooJoinedUserCountType.STANDARD);

		// 2. 최근 가입자 수 조회
		const recentCount = await this.getCafeJoinedUserCount(WakzooJoinedUserCountType.RECENT);

		// 3. 반환 객체 생성 및 반환
		const map: Map<string, number> = new Map<string, number>();
		map.set('standard', stdCount);
		map.set('recent', recentCount);
		return map;
	}

	async getCafeJoinedUserCount(type: string): Promise<number> {

		let result = 0;
		try {
			console.log('type:', type);
			const joinedUserCount = await this.wakzooJoinedUserCountModel.find({ type: type }).sort({ createdAt: -1 }).limit(1).exec();
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

	async scrapCafeJoinedUserCount(): Promise<number> {

		for (let i = 0; i < 3; i++) {

			try {
				// 1. 왁물원 카페 웹 페이지 스캐래핑
				const scrapedData = await this.scrapUtil.scrap(this.wakzoocafe, '.mem-cnt-info');

				// 2. 불필요 문자열 제거
				const cleanedData: string = scrapedData.map(data => data.replace(/[\t\n]/g, ''))[0];

				// 3. 가입한 회원 수 추출
				const joinedUserCount: number = parseInt(cleanedData.substring(5, cleanedData.indexOf('비공개')));

				return joinedUserCount;
			} catch (error) {
				console.error('웹 스크래핑 중 오류 발생:', error);
				continue;
			}
		}

		return 0;

	}

}