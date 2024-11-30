/* eslint-disable prettier/prettier */

import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CafeInfoService } from "./cafeInfo.service";
import { CafeJoinUserCountResDto } from "./dto/res/CafeJoinUserResDto";
import { WakzooJoinedUserCountType } from "./dto/code/WakzooJoinedUserCountType.code";
import { CafeJoinUserCombinedCountResDto } from "./dto/res/CafeJoinUserCombinedResDto";




@ApiTags('cafeInfo API')
@Controller('/api/v1/cafeInfo')
export class CafeInfoController {

  constructor(private readonly cafeInfoService: CafeInfoService) { }

  @Get('/user-count')
  @ApiResponse({ status: 200, description: 'Success', type: CafeJoinUserCombinedCountResDto })
  async getCombine(): Promise<CafeJoinUserCombinedCountResDto> {

    const combinedCount: Map<string, number> = await this.cafeInfoService.getCombinedCafeJoinedUserCount();
    return CafeJoinUserCombinedCountResDto.of(combinedCount.get('standard'), combinedCount.get('recent'));

  }

  @Get('/user-count/:type')
  @ApiParam({ name: 'type', enum: WakzooJoinedUserCountType, required: true, description: 'Type of user count' })
  @ApiResponse({ status: 200, description: 'Success', type: CafeJoinUserCountResDto })
  async get(@Param('type') type: WakzooJoinedUserCountType): Promise<CafeJoinUserCountResDto> {

    const joinUserCount: number = await this.cafeInfoService.getCafeJoinedUserCount(type.toString());

    return CafeJoinUserCountResDto.of(joinUserCount);
  }

  @Post('/user-count')
  @ApiResponse({ status: 200, description: 'Success', type: CafeJoinUserCountResDto })
  async post(): Promise<CafeJoinUserCountResDto> {

    this.cafeInfoService.setCafeJoinedUserCount(WakzooJoinedUserCountType.RECENT);
    const joinUserCount: number = await this.cafeInfoService.getCafeJoinedUserCount(WakzooJoinedUserCountType.RECENT.toString());
    return CafeJoinUserCountResDto.of(joinUserCount);
  }

}