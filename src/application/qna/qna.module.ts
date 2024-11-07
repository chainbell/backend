/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QnaController } from './qna.controller';


@Module({
  imports: [],
  controllers: [QnaController],
})
export class QnaModule {}
