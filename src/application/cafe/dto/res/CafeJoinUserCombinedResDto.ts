/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO: 카페 가입 유저 수 조회 응답
 */
export class CafeJoinUserCombinedCountResDto {

    @ApiProperty({ description: '자정 시간 가입자 수', example: '60000' })
    standardCount: number = 0;

    @ApiProperty({ description: '최신 가입자 수', example: '61000' })
    recentCount: number = 0;



    constructor(standardCount: number, recentCount: number) {
        this.standardCount = standardCount;
        this.recentCount = recentCount;
    }


    static of(standardCount: number, recentCount: number): CafeJoinUserCombinedCountResDto {
        const it = new CafeJoinUserCombinedCountResDto(standardCount, recentCount);
        return it;
    }
}
