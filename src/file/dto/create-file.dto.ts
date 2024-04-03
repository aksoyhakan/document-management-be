import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsPdfFile } from './file.validation';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPdfFile({ message: 'Only PDF is able to be uploaded' })
  data: Buffer;

  @IsNumber()
  folderId: number;
}
