/* eslint-disable prettier/prettier */

import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CafeInfoService } from "./cafeInfo.service";
import { CafeJoinUserCountResDto } from "./dto/res/CafeJoinUserResDto";
import { WakzooJoinedUserCountType } from "./dto/code/WakzooJoinedUserCountType.code";
import { CafeJoinUserCombinedCountResDto } from "./dto/res/CafeJoinUserCombinedResDto";




@ApiTags('카페 정보 API')
@Controller('/api/v1/cafeInfo')
export class CafeInfoController {

  constructor(private readonly cafeInfoService: CafeInfoService) { }

  @Get('/user-count')
  @ApiResponse({ status: 200, description: '가입자 수(기준, 최신 동시) 조회', type: CafeJoinUserCombinedCountResDto })
  async getCombine(): Promise<CafeJoinUserCombinedCountResDto> {

    const combinedCount: Record<string, number> = await this.cafeInfoService.getCombinedCafeJoinedUserCount();
    return CafeJoinUserCombinedCountResDto.of(combinedCount.standard, combinedCount.recent);

  }

  @Get('/user-count/:type')
  @ApiParam({ name: 'type', enum: WakzooJoinedUserCountType, required: true, description: 'Type of user count' })
  @ApiResponse({ status: 200, description: '가입자 수(기준, 최신 중 하나) 조회', type: CafeJoinUserCountResDto })
  async get(@Param('type') type: WakzooJoinedUserCountType): Promise<CafeJoinUserCountResDto> {

    const joinUserCount: number = await this.cafeInfoService.getCafeJoinedUserCount(type.toString());

    return CafeJoinUserCountResDto.of(joinUserCount);
  }

  @Post('/user-count')
  @ApiResponse({ status: 200, description: '가입자 수 저장(카페->DB)', type: CafeJoinUserCountResDto })
  async post(): Promise<CafeJoinUserCountResDto> {

    this.cafeInfoService.setCafeJoinedUserCount(WakzooJoinedUserCountType.RECENT);
    const joinUserCount: number = await this.cafeInfoService.getCafeJoinedUserCount(WakzooJoinedUserCountType.RECENT.toString());
    return CafeJoinUserCountResDto.of(joinUserCount);
  }

}