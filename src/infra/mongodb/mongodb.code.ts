/* eslint-disable prettier/prettier */
export const WakzooMongoDbCode = {
  WAK_ZOO_LIFE : 'wakzoolife', 
} as const;

export type WakzooMongoDbCode =
  typeof WakzooMongoDbCode[keyof typeof WakzooMongoDbCode];
