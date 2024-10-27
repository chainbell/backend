/* eslint-disable prettier/prettier */

import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";



@ApiTags('FAQ API')
@Controller('/api/v1/faq')
export class FaqController {

  constructor() {}

  @Get('')
  @ApiResponse({ status: 200, description: '자주 묻는 질문 조회', type: Map }) 
  get(): string {

    return 'Hello World';
  }


}