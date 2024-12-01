/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { CafeInfoModule } from '../cafe/cafeInfo.module';
import { CafeInfoService } from '../cafe/cafeInfo.service';



@Module({
  imports: [
    CafeInfoModule,
  ],
  controllers: [HomeController],
  providers: [CafeInfoService],
})
export class HomeModule {}
