/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CafeInfoController } from './cafeInfo.controller';
import { CafeInfoService } from './cafeInfo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WakzooJoinedUserCount, WakzooJoinedUserCountSchema } from 'src/infra/mongodb/wakzoo/wakzooJoinedUserCount.schema';

@Module({
  imports: [    
    HttpModule,
    MongooseModule.forFeature(
      [{ name: WakzooJoinedUserCount.name, schema: WakzooJoinedUserCountSchema }]
    ),
  ],
  controllers: [CafeInfoController],
  providers: [CafeInfoService],
  exports: [CafeInfoService, MongooseModule, HttpModule],
})
export class CafeInfoModule {}
