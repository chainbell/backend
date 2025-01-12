/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Document } from 'mongoose';

@Schema({ collection: 'withdraw_history' })
export class WithdrawHistory extends Document {

  @Prop({
    required: true,
    type: String,
    name: 'userId'
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Prop({
    required: true,
    type: String,
    name: 'withdrawId'
  })
  @IsString()
  @IsNotEmpty()
  withdrawId: string;
  
}

export const WithdrawHistorySchema = SchemaFactory.createForClass(WithdrawHistory);

