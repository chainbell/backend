/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Document } from 'mongoose';
import { EncyclopediaMetaInfo, EncyclopediaMetaInfoSchema } from "./encyclopediaMetaInfo.schema";

@Schema({ collection: 'encyclopedia_info' })
export class EncyclopediaInfo extends Document {

    @Prop({ required: true, type: String, name: '_id' })
    @IsString()
    @IsNotEmpty()
    _id: string;

    @Prop({ required: true, type: String, name: 'name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @Prop({ required: true, type: String, name: 'aka' })
    @IsString()
    aka: string = '';

    @Prop({ required: true, type: String, name: 'description' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @Prop({ required: true, type: String, name: 'origin' })
    @IsString()
    origin: string = '';

    @Prop({ required: true, type: String, name: 'instruction' })
    @IsString()
    instruction: string = '';

    @Prop({ required: true, type: String, name: 'image' })
    @IsString()
    image: string = '';

    @Prop({ type: EncyclopediaMetaInfoSchema, required: true })
    setting: EncyclopediaMetaInfo;
}

export const EncyclopediaInfoSchema = SchemaFactory.createForClass(EncyclopediaInfo);








