/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";


@Injectable()
export class EncyclopediaService {
    constructor(
    ) { }

    public async getEncyclopediaList(): Promise<Record<string, string[]>> {
        /**
         * Encyclopedia 인기 급상승 목록 조회 
         */

        return null;

    }

    public async addEncyclopedia(): Promise<void> {
        /**
         * Encyclopedia 추가
         */

        // const id = uuidv4();
        // const newUserInfo = new this.userInfoModel({
        //     _id: id,
        //     oauthType: oauthType,
        //     oauthId: id,
        //     nickname: nickname,
        //     joinedAt: Date.now(),
        //     setting: {
        //         pushAlarmFlag: false,
        //         screenType: ScreenType.SYSTEM
        //     }
        // });




    }

    public async deleteEncyclopedia(id: string): Promise<void> {
        /**
         * Encyclopedia 삭제
         */
    }

    public async updateEncyclopedia(): Promise<void> {
        /**
         * Encyclopedia 조회수, 즐겨찾기 카운트 증가, 감소
         * param : 증가 or 감소시킬 파라미터 종류 (조회수, 즐겨찾기)
         */
    }

}

