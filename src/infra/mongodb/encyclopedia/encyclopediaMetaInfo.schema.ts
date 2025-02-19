/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsNumber, IsString } from "class-validator";

@Schema()
export class EncyclopediaMetaInfo {

    @Prop({ required: true, type: Number, name: 'viewCount' })
    @IsNumber()
    viewCount: number;

    @Prop({ required: true, type: Number, name: 'bookmarkCount' })
    @IsNumber()
    bookmarkCount: number;
}

export const EncyclopediaMetaInfoSchema = SchemaFactory.createForClass(EncyclopediaMetaInfo);

