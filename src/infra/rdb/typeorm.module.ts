/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { WakzooDatabaseModule } from './wakzoo.config';


@Module({
  imports: [
    WakzooDatabaseModule,
	],
})
export class RdbConfigModule {}
