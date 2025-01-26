/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Encyclopedia API - 백과사전 API')
@Controller('/api/v1/encyclopedia')
export class EncyclopediaController {

    @Get('')
    @ApiResponse({ status: 200, description: '백과사전 인기 급상승 조회', type: Map })
    async get(): Promise<Map<string, string>> {

        return null;

    }

    // @Post('')
    // @ApiResponse({ status: 200, description: '백과사전 추가 성공 여부 반환', type: Boolean })
    // async post(@Body() param: Record<string, string>): Promise<boolean> {
    //     return true;
    // }


}