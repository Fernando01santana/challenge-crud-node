import { HttpException, HttpStatus } from '@nestjs/common';

export class CredentialsInvalid extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
