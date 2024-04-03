import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNameNotFoundException extends HttpException {
  constructor(fileName: string) {
    super(`File name:${fileName} is not found`, HttpStatus.NOT_FOUND);
  }
}
