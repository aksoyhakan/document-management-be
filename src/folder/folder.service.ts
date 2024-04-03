import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Folder } from './entity/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { FolderResponseDto } from './dto/folder-response';
import { ResponseCreator } from 'utils/ResponseCreater';
import { FolderNameExistinceException } from 'exceptions/folder-exceptions/foldername.existance.exception';
import { FolderNotFoundException } from 'exceptions/folder-exceptions/folder.notfound.exception';
import { File } from 'src/file/entity/file.entity';
import { FolderNameNotFoundException } from 'exceptions/folder-exceptions/foldername.notfound.exception';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async findAll(): Promise<FolderResponseDto[]> {
    return (await this.folderRepository.find({ relations: ['files'] })).map(
      (folder) => ResponseCreator.constructFolderResponse(folder),
    );
  }

  async findById(folderId: number): Promise<FolderResponseDto> {
    try {
      const searchedFolder = await this.folderRepository.findOne({
        where: { id: folderId },
        relations: ['files'],
      });

      return ResponseCreator.constructFolderResponse(searchedFolder);
    } catch (error) {
      throw new FolderNotFoundException(folderId);
    }
  }

  async create(folder: CreateFolderDto): Promise<FolderResponseDto> {
    const searchedFolder = await this.getByName(folder.name);
    if (searchedFolder) throw new FolderNameExistinceException(folder.name);

    const newFolder = await this.folderRepository.create(folder);
    const savedFolder = await this.folderRepository.save(newFolder);
    return ResponseCreator.constructFolderResponse(savedFolder);
  }

  async delete(id: number): Promise<string> {
    const searchedFolder = await this.findById(id);
    if (!searchedFolder) throw new FolderNotFoundException(id);

    const folder = await this.folderRepository.findOne({
      where: { id },
      relations: ['files'],
    });
    if (folder) {
      await this.fileRepository.remove(folder.files);
      await this.folderRepository.remove(folder);
      return 'OK';
    }
  }

  async getByName(name: string) {
    return await this.folderRepository.findOne({
      where: {
        name,
      },
    });
  }

  async getQueryName(name: string): Promise<FolderResponseDto> {
    try {
      const searchedFolder = await this.folderRepository.findOne({
        where: {
          name: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${name}%')`),
        },
        relations: ['files'],
      });
      return ResponseCreator.constructFolderResponse(searchedFolder);
    } catch (error) {
      throw new FolderNameNotFoundException(name);
    }
  }
}
