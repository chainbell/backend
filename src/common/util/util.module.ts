/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { ScrapUtil } from './scrap.util';

@Global()
@Module({
  providers: [ScrapUtil],
  exports: [ScrapUtil],
})
export class CommonUtilModule {}