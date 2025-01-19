/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";


@Injectable()
export class UserWithdrawService {

	constructor(
		
	) {

	}

    public async saveUserWithdrawReason(userId: string, withdrawId: string): Promise<boolean> {
        /**
         * {userId, withdrawId}를 이용하여 사용자 탈퇴 사유 저장
         */

        // 1. 탈퇴 사유 검증 

        // 2. 탈퇴 사유 이력 저장

        return true;
    }


}