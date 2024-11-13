/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCategoryEntity } from 'src/infra/wakzoolife/credit/creditCategory.entity';
import { CreditParticipantEntity } from 'src/infra/wakzoolife/credit/CreditParticipant.entity';
import { CreditService } from './credit.service';


@Module({
  imports: [TypeOrmModule.forFeature([CreditCategoryEntity, CreditParticipantEntity])],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
