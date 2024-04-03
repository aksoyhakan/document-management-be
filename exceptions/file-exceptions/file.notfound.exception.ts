import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNotFoundException extends HttpException {
  constructor(fileId: number) {
    super(`File id:${fileId} is not found`, HttpStatus.NOT_FOUND);
  }
}
