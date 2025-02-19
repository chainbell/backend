/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EncyclopediaController } from './encyclopedia.controller';
import { EncyclopediaService } from './encyclopedia.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EncyclopediaInfo, EncyclopediaInfoSchema } from 'src/infra/mongodb/encyclopedia/encyclopediaInfo.schema';


@Module({
    imports: [
            MongooseModule.forFeature(
              [{ name: EncyclopediaInfo.name, schema: EncyclopediaInfoSchema }]
            ),
    ],
    controllers: [EncyclopediaController],
    providers: [EncyclopediaService],
})
export class EncyclopediaModule { }
