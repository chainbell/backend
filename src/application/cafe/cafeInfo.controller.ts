/* eslint-disable prettier/prettier */

import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CafeInfoService } from "./cafeInfo.service";
import { CafeJoinUserCountResDto } from "./dto/res/cafeJoinUserResDto";



@ApiTags('cafeInfo API')
@Controller('/api/v1/cafeInfo')
export class CafeInfoController {

  constructor(private readonly cafeInfoService: CafeInfoService) {}

  @Get('')
  @ApiResponse({ status: 200, description: 'Success', type: CafeJoinUserCountResDto }) 
  async get(): Promise<CafeJoinUserCountResDto> {

    const joinUserCount: number = await this.cafeInfoService.getCafeJoinedUserCount();
    
    return CafeJoinUserCountResDto.of(joinUserCount) ;
  }

}