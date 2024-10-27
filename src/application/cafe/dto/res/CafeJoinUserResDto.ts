/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO: 카페 가입 유저 수 조회 응답
 */
export class CafeJoinUserCountResDto {

  @ApiProperty({ description: '카페 가입 유저 수', example: '60000' })
  userCount: number = 0;

  constructor(test: number) {
    this.userCount = test;
  }

  static of(userCount: number): CafeJoinUserCountResDto {
    const it = new CafeJoinUserCountResDto(userCount);
    return it;
  }
}
