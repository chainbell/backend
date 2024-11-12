/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Post, Put } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NaverReqDto } from "./dto/req/NaverReqDto";


@ApiTags('Naver 로그인 API')
@Controller('/api/v1/login')
export class NaverOAuthController {

	constructor() {}

	@Post('')
	@ApiResponse({ status: 200, description: 'Naver access token 발급', type: Map }) 
	post(@Body() requestParam: NaverReqDto): Map<string, any> {
		
		console.log(requestParam);

		return new Map<string, any>();

	}

	@Delete('')
	@ApiResponse({ status: 200, description: 'Naver access token 갱신', type: Map }) 
	delete(): Map<string, any> {
		

		return new Map<string, any>();

	}

	@Put('')
	@ApiResponse({ status: 200, description: 'Naver access token 삭제', type: Map }) 
	put(): Map<string, any> {
		

		return new Map<string, any>();

	}

}