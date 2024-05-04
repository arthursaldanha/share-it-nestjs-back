import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { ZodError } from 'zod';

import {
  OperationalError,
  ContentTypeNotAllowedError,
  FileNotFoundError,
} from '@/contexts/bucket/domain/errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus = this.getHttpStatus(exception);
    const message =
      exception instanceof Error ? exception.message : 'Erro interno';
    const data =
      exception instanceof OperationalError ? exception.data : undefined;
    const code = exception instanceof OperationalError ? exception.code : 10000;

    this.logger.error(exception);

    const responseBody = {
      message,
      data,
      code,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  getHttpStatus(error: unknown) {
    if (!(error instanceof Error)) {
      return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    switch (error.constructor) {
      case OperationalError:
        return HttpStatus.BAD_REQUEST;

      case ZodError:
        return HttpStatus.BAD_REQUEST;

      case ContentTypeNotAllowedError:
        return HttpStatus.BAD_REQUEST;

      case FileNotFoundError:
        return HttpStatus.NOT_FOUND;

      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
