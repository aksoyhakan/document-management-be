import { HttpException, HttpStatus } from '@nestjs/common';

export class FolderNameExistinceException extends HttpException {
  constructor(folderName: string) {
    super(`${folderName} is already used`, HttpStatus.BAD_REQUEST);
  }
}
