/* eslint-disable prettier/prettier */
export const UserOauthType = {
    NAVER: 'NAVER',
    GOOGLE: 'GOOGLE',
    SYSTEM: 'SYSTEM', // Oauth 정보가 아닌 시스템에서 생성한 정보
} as const;

export type UserOauthType =
    typeof UserOauthType[keyof typeof UserOauthType];
