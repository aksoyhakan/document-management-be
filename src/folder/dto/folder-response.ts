export class FolderResponseDto {
  constructor(
    private id: number,
    private name: string,
    private files: { data: Buffer; name: string }[],
  ) {}
}
