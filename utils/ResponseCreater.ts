import { CreateUserResponseDto } from 'src/auth/dto/create-user-response';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response';
import { CreateFileResponseDto } from 'src/file/dto/create-file-response';
import { FileResponseDto } from 'src/file/dto/file-response';
import { File } from 'src/file/entity/file.entity';
import { CreateFolderResponseDto } from 'src/folder/dto/create-folder-response';
import { FolderResponseDto } from 'src/folder/dto/folder-response';
import { Folder } from 'src/folder/entity/folder.entity';

export class ResponseCreator {
  public static constructLoginResponse(name: string, token: string) {
    return new LoginUserResponseDto(name, token);
  }

  public static constructRegistResponse(userId: number) {
    return new CreateUserResponseDto('success', userId);
  }

  public static constructCreateFolderResponse(folderId: number) {
    return new CreateFolderResponseDto('success', folderId);
  }

  public static constructCreateFileResponse(fileId: number) {
    return new CreateFileResponseDto('success', fileId);
  }

  public static constructFolderResponse(folder: Folder) {
    return new FolderResponseDto(
      folder.id,
      folder.name,
      folder.files?.map((file) => ({ data: file.data, name: file.name })),
    );
  }

  public static constructFileResponse(file: File) {
    return new FileResponseDto(
      file.id,
      file.name,
      file.data,
      file.folder.id,
      file.folder.name,
    );
  }
}
