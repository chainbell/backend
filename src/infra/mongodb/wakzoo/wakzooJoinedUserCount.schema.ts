/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Document } from 'mongoose';
import { WakzooJoinedUserCountType } from "src/application/cafe/dto/code/WakzooJoinedUserCountType.code";

@Schema({ collection: 'wakzoo_joined_user_count' })
export class WakzooJoinedUserCount extends Document {

    @Prop({
        required: true,
        name: 'count'
    })
    @IsNotEmpty()
    count: number = -1;

    @Prop({
        required: true,
        name: 'type'
    })
    @IsNotEmpty()
    type: WakzooJoinedUserCountType = WakzooJoinedUserCountType.RECENT;

    @Prop({
        required: true,
        name: 'savedAt',
        default: Date.now
    })
    @IsNotEmpty()
    savedAt: Date;

}

export const WakzooJoinedUserCountSchema = SchemaFactory.createForClass(WakzooJoinedUserCount)