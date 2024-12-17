/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Document } from 'mongoose';

@Schema({ collection: 'oauth_naver_user' })
export class OuathNaverUser extends Document {


    @Prop({
        required: true,
        name: 'name'
    })
    @IsNotEmpty()
    id: string;

    @Prop({
        required: true,
        name: 'nickname'
    })
    @IsNotEmpty()
    nickname: string;

}

export const OuathNaverUserSchema = SchemaFactory.createForClass(OuathNaverUser)