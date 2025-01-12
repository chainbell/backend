/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WithdrawInfo } from "src/infra/mongodb/withdraw/withdrawInfo.schema";


@Injectable()
export class WithdrawService {

    constructor(
        @InjectModel(WithdrawInfo.name) private readonly withdrawInfoModel: Model<WithdrawInfo>,
    ) {

    }

    public async getWithdrawInfo(): Promise<Record<string, any>[]> {
        const withdrawInfos = await this.withdrawInfoModel.find({ withdrawUseFlag: true }).exec();
        return withdrawInfos.map(info => ({
            id: info._id,
            reason: info.withdrawReason
        }));
    }

    public async addWithdrawReason(reason: string): Promise<boolean> {

        try {
            const withdrawReason = new this.withdrawInfoModel({
                withdrawReason: reason,
                withdrawUseFlag: true,
            });

            await withdrawReason.save();

            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }

    }


}