/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Document } from 'mongoose';

@Schema({ collection: 'withdraw_info' })
export class WithdrawInfo extends Document {


  @Prop({
    required: true,
    type: String,
    name: 'withdrawReason'
  })
  @IsString()
  @IsNotEmpty()
  withdrawReason: string;

  @Prop({
    required: true,
    type: String,
    name: 'withdrawUseFlag'
  })
  @IsString()
  @IsNotEmpty()
  withdrawUseFlag: string;

}

export const WithdrawInfoSchema = SchemaFactory.createForClass(WithdrawInfo);

