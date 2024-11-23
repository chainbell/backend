/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Document } from 'mongoose';

@Schema({collection: 'credit_participant' })
export class CreditParticipant extends Document{

  // @Prop({
  //   type: String,
  //   required: true,
  //   unique: true,
	// })
  // @IsNotEmpty()
  // _id: string;

  @Prop({
    required: true,
    name: 'name'
	})
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
    name: 'category'
	})
  @IsNotEmpty()
  category: string;

  public static of(id: string, name: string, category: string): CreditParticipant {
      return new CreditParticipant({ id, name, category });
  }

}

export const CreditParticipantSchema = SchemaFactory.createForClass(CreditParticipant)