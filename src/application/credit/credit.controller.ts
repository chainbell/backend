/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreditResDto } from "./dto/res/CreditResDto";
import { CreditListResDto } from "./dto/res/CreditListResDto";
import { CreditParticipantAddDto } from "./dto/req/CreditParticipantAddDto";
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
    
    const creditList = await this.creditService.getCreditList();
    
    const creditResDtoList: CreditResDto[] = [];
    for (const key in creditList) {
      creditResDtoList.push(CreditResDto.of(key, creditList[key]));
    }
    
    return CreditListResDto.from(creditResDtoList);

  }

  @Post('')
  @ApiResponse({ status: 200, description: '설정 - 크레딧 유저 추가', type: Map })
  async post(@Body() param: CreditParticipantAddDto): Promise<boolean> {
    
    this.creditService.addCreditParticipant(param.name, param.category);

    return true;
  }


}