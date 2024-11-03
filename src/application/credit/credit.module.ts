/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommonUtilModule } from 'src/common/util/util.module';
import { CreditController } from './credit.controller';


@Module({
  imports: [CommonUtilModule],
  controllers: [CreditController],
})
export class CreditModule {}
