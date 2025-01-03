/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Interval } from "@nestjs/schedule";
import { CafeInfoService } from "src/application/cafe/cafeInfo.service";
import { WakzooJoinedUserCountType } from "src/application/cafe/dto/code/WakzooJoinedUserCountType.code";

@Injectable()
export class AppSchedulerService {

	constructor(private readonly cafeInfoService : CafeInfoService) {}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) 
	setMidnightCafeJoinedUserCount() {
		this.cafeInfoService.setCafeJoinedUserCount(WakzooJoinedUserCountType.STANDARD);
	}

	@Cron(CronExpression.EVERY_10_MINUTES) 
	setRecentCafeJoinedUserCount() {
		
		this.cafeInfoService.setCafeJoinedUserCount(WakzooJoinedUserCountType.RECENT);

	}

}