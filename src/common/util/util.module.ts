/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { ScrapUtil } from './scrap.util';
import { EnumUtil } from './enum.util';

@Global()
@Module({
  providers: [ScrapUtil, EnumUtil],
  exports: [ScrapUtil, EnumUtil],
})
export class CommonUtilModule {}