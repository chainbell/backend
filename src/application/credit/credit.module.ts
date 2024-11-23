/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CreditController } from './credit.controller';
import { CreditService } from './credit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CreditParticipant, CreditParticipantSchema } from 'src/infra/mongodb/credit/creditParticipant.schema';



@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: CreditParticipant.name, schema: CreditParticipantSchema }]
    ),
  ],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
