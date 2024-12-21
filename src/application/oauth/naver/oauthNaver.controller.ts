/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { NaverOauthCallbackReqDto } from "./dto/callback/NaverOauthCallbackReqDto";
import { NaverOauthService } from "./oauthNaver.service";
import { NaverOauthCallbackResDto } from "./dto/callback/NaverOauthCallbackResDto";
import { NaverOauthProfileReqDto } from "./dto/profile/NaverOauthProfileReqDto";
import { NaverOauthProfileResDto } from "./dto/profile/NaverOauthProfileResDto";



@ApiTags('Oauth-Naver API')
@Controller('/api/v1/oauth/naver')
export class NaverOauthController {

  constructor(
    private readonly naverOauthService: NaverOauthService
  ) { }

  @Post('/callback')
  @ApiResponse({ status: 200, description: '', type: Map })
  async postCallBack(@Body() param: NaverOauthCallbackReqDto): Promise<NaverOauthCallbackResDto> {

    const oauthInfo = await this.naverOauthService.issueNaverOauthToken(param.code, param.state);

    const result = NaverOauthCallbackResDto.of(oauthInfo.accessToken, oauthInfo.refreshToken, oauthInfo.tokenType, oauthInfo.expiresIn);

    return result;
  }

  @Get('/profile')
  @ApiResponse({ status: 200, description: '', type: Map })
  async getProfile(@Query() param: NaverOauthProfileReqDto): Promise<NaverOauthProfileResDto> {
    
    const profile = await this.naverOauthService.getNaverProfile(param.tokenType, param.accessToken);
    return NaverOauthProfileResDto.of(profile.nickname);
  }




}