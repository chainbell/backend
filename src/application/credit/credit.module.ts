/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';


@Module({
  imports: [],
  controllers: [CreditController],
})
export class CreditModule {}
