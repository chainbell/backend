/* eslint-disable prettier/prettier */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class OauthInterceptor implements NestInterceptor {

  constructor() {}


  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(async (data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        // 1. 헤더에 oauthType, accessToken이 있는지 확인
        const oauthType = request.headers['oauthType'];
        const accessToken = request.headers['accessToken'];

        if (!oauthType || !accessToken) {
          return {
            oauthFlag: false,
          };
        }
        
        return data;
      }),
    );
  }
}
