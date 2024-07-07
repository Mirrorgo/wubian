import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        if (
          context.switchToHttp().getRequest().method === 'POST' &&
          response.statusCode === 201
        ) {
          response.status(200);
        }
        return {
          success: true,
          code: 0,
          msg: 'success',
          data: data,
        };
      }),
      catchError((err) => {
        const status = err.getStatus ? err.getStatus() : 500;
        const message = err.message || 'Internal server error';
        response.status(status).json({
          success: false,
          code: status,
          msg: message,
        });
        return throwError(() => err);
      }),
    );
  }
}
