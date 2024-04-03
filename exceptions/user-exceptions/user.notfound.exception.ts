import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor(userId: number) {
    super(`User id:${userId} is not found`, HttpStatus.NOT_FOUND);
  }
}
