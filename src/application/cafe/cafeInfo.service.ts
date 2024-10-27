/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ScrapUtil } from '../../common/util/scrap.util';
import { ConfigService } from '@nestjs/config';

/**
 * Service for getting information about the wakzoo cafe.
 */
@Injectable()
export class CafeInfoService {
	
	wakzoocafe: string;

	constructor(
		private readonly scrapUtil : ScrapUtil, 
		private readonly configService: ConfigService
	) {
		this.wakzoocafe = this.configService.get<string>('WAK_ZOO');
	}
	
	setCafeJoinedUserCount(): void {

		this.getCafeJoinedUserCount().then((joinedUserCount) => {
			console.log(`Joined User Count: ${joinedUserCount}`);
			// db 저장 로직 추가 지점(미구현)
		});
	
	}

	async getCafeJoinedUserCount(): Promise<number> {
		
		// 1. 왁물원 카페 웹 페이지 스캐래핑
    const scrapedData = await this.scrapUtil.scrap(this.wakzoocafe, '.mem-cnt-info');
    
		// 2. 불필요 문자열 제거
		const cleanedData: string = scrapedData.map(data => data.replace(/[\t\n]/g, ''))[0];
		
		// 3. 가입한 회원 수 추출
    const joinedUserCount: number= parseInt(cleanedData.substring(5, cleanedData.indexOf('비공개')));

    return joinedUserCount;

	}

}