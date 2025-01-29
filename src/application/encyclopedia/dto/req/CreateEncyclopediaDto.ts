/* eslint-disable prettier/prettier */

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEncyclopediaDto {
    @ApiProperty({ description: '백과사전 항목의 제목' })
    @IsString()
    readonly title: string = '';

    @ApiProperty({ description: '백과사전 항목의 별명' })
    @IsString()
    readonly aka: string = '';

    @ApiProperty({ description: '백과사전 항목 설명' })
    @IsString()
    readonly description: string;

    @ApiProperty({ description: '백과사전 항목 유래' })
    @IsString()
    readonly origin: string = '';

    @ApiProperty({ description: '백과사전 항목 사용법' })
    @IsString()
    readonly instruction: string = '';

    @ApiProperty({ format: 'binary',description: '백과사전 항목 사용법' })
    readonly file: string;
}