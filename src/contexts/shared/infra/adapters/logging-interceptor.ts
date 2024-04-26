import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLogger } from './logger';

export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly appLogger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = this.appLogger.getLoggerInstance('LoggingInterceptor');
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const now = Date.now();
    return next.handle().pipe(
      tap(async (data) => {
        const protocol = request.protocol;
        const hostname = request.hostname;
        const baseUrl = `${protocol}://${hostname}`;

        const event = {
          event: 'received_request',
          data: {
            request: {
              method: request.method,
              url: request.originalUrl,
              params: request.params,
              body: request.body,
              headers: request.headers,
              baseUrl,
            },
            response: {
              duration: Date.now() - now,
              statusCode: response.statusCode,
              body: data,
              headers: response.getHeaders(),
            },
          },
        };
        logger.trace(event);
      }),
    );
  }
}
