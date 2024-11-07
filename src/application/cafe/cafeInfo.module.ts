/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CafeInfoController } from './cafeInfo.controller';
import { CafeInfoService } from './cafeInfo.service';

@Module({
  controllers: [CafeInfoController],
  providers: [CafeInfoService],
  exports: [CafeInfoService],
})
export class CafeInfoModule {}
