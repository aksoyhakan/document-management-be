import { HttpException, HttpStatus } from '@nestjs/common';

export class FolderNotFoundException extends HttpException {
  constructor(folderId: number) {
    super(`Folder id:${folderId} is not found`, HttpStatus.NOT_FOUND);
  }
}
