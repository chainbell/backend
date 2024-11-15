/* eslint-disable prettier/prettier */

import { Controller, Get, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreditResDto } from "./dto/res/CreditResDto";
import { CreditListResDto } from "./dto/res/CreditListResDto";
import { CreditService } from "./credit.service";



@ApiTags('Credit API - 크레딧 API')
@Controller('/api/v1/credit')
export class CreditController {

  constructor(
    private readonly creditService: CreditService,
  ) {}

  @Get('')
  @ApiResponse({ status: 200, description: '설정 - 크레딧 정보 조회', type: CreditListResDto }) 
  async get(): Promise<CreditListResDto> {
    
    this.creditService.getCreditList();

    return CreditListResDto.from([CreditResDto.of('기획', ['유저 1']), CreditResDto.of('개발', ['유저 2'])]);
  }

  @Post('')
  @ApiResponse({ status: 200, description: '설정 - 크레딧 유저 추가', type: Map })
  async post(): Promise<Map<string, string>> {
    

    return new Map<string, string>([['result', 'success']]);
  }


}