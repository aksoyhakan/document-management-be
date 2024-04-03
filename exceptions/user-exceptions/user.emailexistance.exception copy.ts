import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExistinceException extends HttpException {
  constructor(email: string) {
    super(`${email} is already used`, HttpStatus.BAD_REQUEST);
  }
}
