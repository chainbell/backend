/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WithdrawHistory } from "src/infra/mongodb/withdraw/withdrawHistory.schema";
import { WithdrawInfo } from "src/infra/mongodb/withdraw/withdrawInfo.schema";


@Injectable()
export class UserWithdrawService {

    constructor(
        @InjectModel(WithdrawHistory.name) private readonly withdrawHistory: Model<WithdrawHistory>,
        @InjectModel(WithdrawInfo.name) private readonly withdrawInfo: Model<WithdrawInfo>,

    ) {

    }

    public async saveUserWithdrawReason(userId: string, withdrawId: string): Promise<boolean> {
        /**
         * {userId, withdrawId}를 이용하여 사용자 탈퇴 사유 저장
         */

        try {
            // 1. 탈퇴 사유 검증 
            const withdrawInfo = await this.withdrawInfo.findOne({ _id: withdrawId });
            if (withdrawInfo == null) {
                return false;
            }

            // 2. 탈퇴 사유 이력 저장
            const newWithdrawHistory = new this.withdrawHistory({
                userId: userId,
                withdrawId: withdrawId,
                withdrawAt: Date.now(),
            });
            newWithdrawHistory.save();

            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }


}