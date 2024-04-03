import { HttpException, HttpStatus } from '@nestjs/common';

export class FolderNameNotFoundException extends HttpException {
  constructor(folderName: string) {
    super(`Folder name:${folderName} is not found`, HttpStatus.NOT_FOUND);
  }
}
