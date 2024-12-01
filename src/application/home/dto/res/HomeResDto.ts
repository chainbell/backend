/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO: 카페 가입 유저 수 조회 응답
 */
export class HomeResDto {

    @ApiProperty({ description: '자정 시간 가입자 수', example: '60000' })
    standardCount: number = 0;

    @ApiProperty({ description: '최신 가입자 수', example: '61000' })
    recentCount: number = 0;

    @ApiProperty({ description: '오늘의 짤 제목', example: '니는 지금 상황이 파익이 안되니?' })
    todayImageTitle: string = '';

    @ApiProperty({ description: '오늘의 짤 배경 이미지', example: '' })
    todayImageUrl: string = '';

    @ApiProperty({ description: '오늘의 단어', example: '말머리' })
    todayWord: string = '';

    @ApiProperty({ description: '오늘의 단어 배경 이미지', example: '' })
    todayWordBgUrl: string = '';

    constructor(standardCount: number, recentCount: number) {
        this.standardCount = standardCount;
        this.recentCount = recentCount;
    }

    static of(standardCount: number, recentCount: number): HomeResDto {
        const it = new HomeResDto(standardCount, recentCount);
        return it;
    }

}
