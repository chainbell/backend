/* eslint-disable prettier/prettier */

import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreditResDto } from "./dto/res/CreditResDto";
import { CreditListResDto } from "./dto/res/CreditListResDto";



@ApiTags('Credit API - 크레딧 API')
@Controller('/api/v1/credit')
export class CreditController {

  constructor() {}

  @Get('')
  @ApiResponse({ status: 200, description: '설정 - 크레딧 정보 조회', type: CreditListResDto }) 
  get(): CreditListResDto {
    
    return CreditListResDto.from([CreditResDto.of('기획', ['유저 1']), CreditResDto.of('개발', ['유저 2'])]);
  }


}