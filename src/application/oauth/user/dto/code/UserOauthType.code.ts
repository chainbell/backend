/* eslint-disable prettier/prettier */
export const UserOauthType = {
    NAVER: 'NAVER',
    GOOGLE: 'GOOGLE'
} as const;

export type UserOauthType =
    typeof UserOauthType[keyof typeof UserOauthType];
