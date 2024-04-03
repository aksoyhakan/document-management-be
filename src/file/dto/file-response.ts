export class FileResponseDto {
  constructor(
    private id: number,
    private name: string,
    private data: Buffer,
    private folderId: number,
    private folderName: string,
  ) {}
}
