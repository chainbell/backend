/* eslint-disable prettier/prettier */


import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function ApiOAuthHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'oauthType',
      description: 'Oauth 타입 (NAVER, GOOGLE, SYSTEM)',
    }),
    ApiHeader({
      name: 'accessToken',
      description: 'Oauth Access Token',
    }),
  );
}
