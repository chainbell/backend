/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommonUtilModule } from 'src/common/util/util.module';
import { QnaController } from './qna.controller';


@Module({
  imports: [CommonUtilModule],
  controllers: [QnaController],
})
export class QnaModule {}
