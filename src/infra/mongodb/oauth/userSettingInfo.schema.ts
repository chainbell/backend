/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsString } from "class-validator";

@Schema()
export class Setting {
  @Prop({ required: true })
  @IsBoolean()
  pushAlarmFlag: boolean;

  @Prop({ required: true })
  @IsString()
  screenType: string;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);

