/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Document } from 'mongoose';

@Schema({ collection: 'oauth_naver_user' })
export class OauthNaverUser extends Document {


    @Prop({
        required: true,
        name: 'id'
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

export const OauthNaverUserSchema = SchemaFactory.createForClass(OauthNaverUser)