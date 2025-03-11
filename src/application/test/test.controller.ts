/* eslint-disable prettier/prettier */

import { TestService } from './test.service';
import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TestResDto } from './dto/res/TestResDto';
import { TestReqDto } from './dto/req/TestReqDto';


@ApiBearerAuth()
@ApiTags('Test - Test API')
@Controller('/test')
export class TestController {

  constructor(private readonly testService: TestService) {}

  @Get(':testParam')
  @ApiResponse({ status: 200, description: 'Success', type: TestResDto }) 
  async get(@Headers() headers: Record < string, string >, @Param('testParam') testParam: string): Promise<TestResDto> {

    const result = TestResDto.from(await this.testService.getTestValue(testParam));
    
    return result;
  
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Success', type: TestResDto }) 
  post(@Body() testReqDto: TestReqDto): TestResDto {
    
    const resultStr = this.testService.postTestValue(testReqDto.strParam);
    const result = TestResDto.from(resultStr);
    return result;
  }

}