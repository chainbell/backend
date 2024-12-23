/* eslint-disable prettier/prettier */
export const ScreenType = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
    SYSTEM: 'SYSTEM'
} as const;

export type ScreenType =
    typeof ScreenType[keyof typeof ScreenType];
