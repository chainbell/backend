/* eslint-disable prettier/prettier */
export const WakzooJoinedUserCountType = {
    STANDARD: 'STANDARD',
    RECENT: 'RECENT'
} as const;

export type WakzooJoinedUserCountType =
    typeof WakzooJoinedUserCountType[keyof typeof WakzooJoinedUserCountType];
