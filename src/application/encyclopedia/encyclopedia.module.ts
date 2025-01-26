/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncyclopediaController } from './encyclopedia.controller';
import { EncyclopediaInfo, EncyclopediaInfoSchema } from 'src/infra/mongodb/encyclopedia/encyclopediaInfo.schema';


@Module({
    imports: [
        MongooseModule.forFeature(
            [
                { name: EncyclopediaInfo.name, schema: EncyclopediaInfoSchema }
            ]
        ),
    ],
    controllers: [EncyclopediaController],
    providers: [],
})
export class EncyclopediaModule { }
