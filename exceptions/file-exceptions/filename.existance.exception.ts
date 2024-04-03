import { HttpException, HttpStatus } from '@nestjs/common';

export class FileNameExistinceException extends HttpException {
  constructor(fileName: string) {
    super(`${fileName} is already used`, HttpStatus.BAD_REQUEST);
  }
}
