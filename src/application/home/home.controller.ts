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

    // 2. 오늘의 짤 정보 조회 (임시 데이터)
    const totayImageInfo = {
      title: '니는 지금 상황이 파익이 안되니?',
      imageUrl: 'https://cafeptthumb-phinf.pstatic.net/MjAyNDEwMTdfMTg2/MDAxNzI5MTUyMTQyNTgx.g3SuEVpUCHI5UNixdvIITBSH8hhEsHtZGqYPD83asj0g.9VL1Trsg0INsXRGKCx9eipq2vCP8U2dpo-K7Hb5uAEkg.PNG/%EA%B0%80%EC%9D%84%ED%83%80%EC%9D%B4%ED%8B%80.png'
    };

    // 3. 오늘의 단어 정보 조회 (임시 데이터)
    const todayWordInfo = {
      word: '말머리',
      bgUrl: 'https://cafeptthumb-phinf.pstatic.net/MjAyNDEwMTdfMTg2/MDAxNzI5MTUyMTQyNTgx.g3SuEVpUCHI5UNixdvIITBSH8hhEsHtZGqYPD83asj0g.9VL1Trsg0INsXRGKCx9eipq2vCP8U2dpo-K7Hb5uAEkg.PNG/%EA%B0%80%EC%9D%84%ED%83%80%EC%9D%B4%ED%8B%80.png'
    }

    const result = HomeResDto.of(
      cafeJoinedUserCount.standard, cafeJoinedUserCount.recent,
      totayImageInfo.title, totayImageInfo.imageUrl,
      todayWordInfo.word, todayWordInfo.bgUrl
    );

    return result;

  }

}