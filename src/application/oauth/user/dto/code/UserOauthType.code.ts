/* eslint-disable prettier/prettier */
export const UserOauthType = {
    NAVER: 'N_',
    GOOGLE: 'G_'
} as const;

export type UserOauthType =
    typeof UserOauthType[keyof typeof UserOauthType];
