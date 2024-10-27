/* eslint-disable prettier/prettier */

import { Controller, Get, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";



@ApiTags('QNA API')
@Controller('/api/v1/qna')
export class QnaController {

  constructor() {}

  @Get('')
  @ApiResponse({ status: 200, description: '', type: Map }) 
  get(): string {

    return 'Hello World';
  }

  @Post('')
  @ApiResponse({ status: 200, description: '', type: Map }) 
  post(): string {

    return 'Hello World';
  }

}