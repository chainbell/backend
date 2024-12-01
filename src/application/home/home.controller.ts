/* eslint-disable prettier/prettier */

import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CafeInfoService } from "../cafe/cafeInfo.service";
import { HomeResDto } from "./dto/res/HomeResDto";

@ApiTags('Home API - 홈 화면 API')
@Controller('/api/v1/home')
export class HomeController {

  constructor(private readonly cafeInfoService: CafeInfoService) { }


  @Get('')
  @ApiResponse({ status: 200, description: '홈 화면 정보 조회', type: HomeResDto })
  async get(): Promise<HomeResDto> {

    // 1. 카페 가입자 수 조회
    const cafeJoinedUserCount = await this.cafeInfoService.getCombinedCafeJoinedUserCount();

    // 2. 오늘의 짤 정보 조회
    
    // 3. 오늘의 단어 정보 조회

    return HomeResDto.of(cafeJoinedUserCount.get('standard'), cafeJoinedUserCount.get('recent'));

  }

}