/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CafeInfoController } from './cafeInfo.controller';
import { CafeInfoService } from './cafeInfo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WakzooJoinedUserCount, WakzooJoinedUserCountSchema } from 'src/infra/mongodb/wakzoo/wakzooJoinedUserCount.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: WakzooJoinedUserCount.name, schema: WakzooJoinedUserCountSchema }]
    ),
  ],
  controllers: [CafeInfoController],
  providers: [CafeInfoService],
  exports: [CafeInfoService],
})
export class CafeInfoModule {}
