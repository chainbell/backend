/* eslint-disable prettier/prettier */
export const CreditCategoryCode = {
  LEADER : 'LEADER', // 총괄
  PROJECT_MANAGER : 'PROJECT_MANAGER', // PM 
  PROJECT_DESIGNER : 'PROJECT_DESIGNER', // 기획
  DEVELOP : 'DEVELOP', //  개발
  INFRA_PROVIDE : 'INFRA_PROVIDE', // 인프라 제공 
  UIUX : 'UIUX', // UIUX
  TWO_D_DESIGN : '2D_DESIGN', // 2D 디자인
  ILLUSTRATOR : 'ILLUSTRATOR', // 일러스터
  INFO_MANAGER : 'INFO_MANAGER', // 정보 정리
  SPECIAL_THANKS : 'SPECIAL_THANKS' // Special Thanks
} as const;

export type CreditCategoryCode =
  typeof CreditCategoryCode[keyof typeof CreditCategoryCode];
