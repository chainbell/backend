/* eslint-disable prettier/prettier */

import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Home API - 홈 화면 API')
@Controller('/api/v1/home')
export class HomeController {


    @Get('')
    @ApiResponse({ status: 200, description: '홈 화면 정보 조회', type: Map }) 
    async get(): Promise<Map<string, string>> {
      
        
      return null;
  
    }

}