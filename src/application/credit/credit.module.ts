/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCategoryEntity } from 'src/infra/wakzoolife/credit/creditCategory.entity';
import { CreditParticipantEntity } from 'src/infra/wakzoolife/credit/CreditParticipant.entity';
import { CreditService } from './credit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditParticipant, CreditParticipantSchema } from 'src/infra/mongodb/credit/creditParticipant.schema';



@Module({
  imports: [
    TypeOrmModule.forFeature([CreditCategoryEntity, CreditParticipantEntity]),
    MongooseModule.forFeature(
      [{ name: CreditParticipant.name, schema: CreditParticipantSchema }]
    ),
  ],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
