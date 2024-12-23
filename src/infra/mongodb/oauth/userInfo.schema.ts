/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Document } from 'mongoose';
import { Setting, SettingSchema } from "./userSettingInfo.schema";

@Schema({ collection: 'user_info' })
export class UserInfo extends Document {

    @Prop({
        required: true,
        type: String,
        name: '_id'
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @Prop({
        required: true,
        type: String,
        name: 'oauthType'
    })
    @IsString()
    @IsNotEmpty()
    oauthType: string;

    @Prop({
        required: true,
        type: String,
        name: 'oauthId'
    })
    @IsString()
    @IsNotEmpty()
    oauthId: string;

    @Prop({
        required: true,
        name: 'nickname'
    })
    @IsString()
    @IsNotEmpty()
    nickname: string;

    @Prop({
        required: true,
        name: 'joinedAt',
        default: Date.now
    })
    @IsNotEmpty()
    @IsDate()
    joinedAt: Date;

    @Prop({ type: SettingSchema, required: true })
    setting: Setting;
}

export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);








