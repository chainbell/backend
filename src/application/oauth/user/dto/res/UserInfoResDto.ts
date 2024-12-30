/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { ScreenType } from "../code/ScreenType.code";

export class UserInfoResDto {

    @ApiProperty({ description: '사용자 닉네임', example: '팬치_1' })
    @IsString()
    readonly nickname: string;

    @ApiProperty({ description: '알림 설정', example: true })
    @IsString()
    readonly pushAlarmFlag: boolean;

    @ApiProperty({ description: '화면 설정', example: ScreenType.SYSTEM })
    @IsString()
    readonly screenType: ScreenType;




    constructor(nickname: string, pushAlarmFlag: boolean, screenType: ScreenType) {
        this.nickname = nickname;
        this.pushAlarmFlag = pushAlarmFlag;
        this.screenType = screenType;
    }

    static of(nickname: string, pushAlarmFlag: boolean, screenType: ScreenType): UserInfoResDto {
        return new UserInfoResDto(nickname, pushAlarmFlag, screenType);
    }


}
