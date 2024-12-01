/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class TestResDto {

  @ApiProperty({ description: 'Request test field', example: 'test-value' })
  @IsString()
  test: string = 'test';

  constructor(test: string) {
    this.test = test;
  }

  static from(test: string): TestResDto {
    const it = new TestResDto(test);
    return it;
  }
}
