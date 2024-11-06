/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TestModule } from "./test/test.module";
import { CafeInfoModule } from "./cafe/cafeInfo.module";
import { FaqModule } from "./faq/faq.module";
import { CreditModule } from "./credit/credit.module";
import { QnaModule } from "./qna/qna.module";

@Module({
  imports: [
		TestModule,
    CafeInfoModule,
    FaqModule,
    QnaModule,
    CreditModule,
	],
})
export class ApplicationModule {}
