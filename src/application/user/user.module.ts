/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { NaverOAuthController } from './naver/nuser.controller';


@Module({
  imports: [],
  controllers: [NaverOAuthController],
})
export class UserModule {}