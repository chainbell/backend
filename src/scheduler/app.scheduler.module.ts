/* eslint-disable prettier/prettier */


import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppSchedulerService } from './app.scheduler';
import { CafeInfoModule } from 'src/application/cafe/cafeInfo.module';


@Module({
  imports: [
		ScheduleModule.forRoot(),
		CafeInfoModule,
	],
  providers: [AppSchedulerService],  
})
export class AppSchedulerModule {}