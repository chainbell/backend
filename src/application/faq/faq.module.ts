/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommonUtilModule } from 'src/common/util/util.module';
import { FaqController } from './faq.controller';


@Module({
  imports: [CommonUtilModule],
  controllers: [FaqController],
})
export class FaqModule {}
