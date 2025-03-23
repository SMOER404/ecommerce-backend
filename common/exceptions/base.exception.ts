import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    error?: any,
  ) {
    super(
      {
        message,
        error: error?.message || error,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
} 