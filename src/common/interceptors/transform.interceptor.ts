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
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        if (request.url === '/') return data;

        // oauth 정보가 없는 경우
        // if (data.oauthFlag === false) {
        //   return {
        //     code: 'UNAUTHORIZED',
        //     status: HttpStatus.UNAUTHORIZED,
        //     data: null,
        //     responseAt: new Date().toISOString(),
        //   };
        // }

        return {
          code: response.statusCode.toString().startsWith('2')
            ? 'OPERATION_COMPLETE'
            : HttpStatus[response.statusCode],
          status: response.statusCode,

          data: data,

          responseAt: new Date().toISOString(),
        };
      }),
    );
  }
}
