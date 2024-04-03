import { Injectable } from '@nestjs/common';
import { File } from './entity/file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { FileResponseDto } from './dto/file-response';
import { ResponseCreator } from 'utils/ResponseCreater';
import { CreateFileDto } from './dto/create-file.dto';
import { CreateFileResponseDto } from './dto/create-file-response';
import { FileNotFoundException } from 'exceptions/file-exceptions/file.notfound.exception';
import { FileNameExistinceException } from 'exceptions/file-exceptions/filename.existance.exception';
import { Folder } from 'src/folder/entity/folder.entity';
import { FolderNotFoundException } from 'exceptions/folder-exceptions/folder.notfound.exception';
import { FileNameNotFoundException } from 'exceptions/file-exceptions/filename.notfound.exception';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async findAll(): Promise<FileResponseDto[]> {
    return (await this.fileRepository.find({ relations: ['folder'] })).map(
      (file) => ResponseCreator.constructFileResponse(file),
    );
  }

  async create(fileData: CreateFileDto): Promise<CreateFileResponseDto> {
    const searchedFile = await this.getByName(fileData.name);
    if (searchedFile) throw new FileNameExistinceException(fileData.name);

    const searchFolder = await this.folderRepository.findOne({
      where: { id: fileData.folderId },
    });

    if (!searchFolder) throw new FolderNotFoundException(fileData.folderId);

    const file = await this.fileRepository.create({
      name: fileData.name,
      data: fileData.data,
      folder: { id: fileData.folderId },
    });
    const savedFile = await this.fileRepository.save(file);
    return ResponseCreator.constructCreateFileResponse(savedFile.id);
  }

  async delete(id: number): Promise<string> {
    const searchedFile = await this.findById(id);

    if (!searchedFile) throw new FileNotFoundException(id);
    await this.fileRepository.delete(id);
    return 'OK';
  }

  async findById(fileId: number): Promise<FileResponseDto> {
    try {
      const searchedFile = await this.fileRepository.findOne({
        where: { id: fileId },
        relations: ['folder'],
      });

      return ResponseCreator.constructFileResponse(searchedFile);
    } catch (error) {
      throw new FileNotFoundException(fileId);
    }
  }

  async getByName(name: string) {
    return await this.fileRepository.findOne({
      where: {
        name,
      },
    });
  }

  async getQueryName(name: string): Promise<FileResponseDto> {
    try {
      const searchedFile = await this.fileRepository.findOne({
        where: {
          name: Raw((alias) => `LOWER(${alias}) LIKE LOWER('%${name}%')`),
        },
        relations: ['folder'],
      });
      return ResponseCreator.constructFileResponse(searchedFile);
    } catch (error) {
      throw new FileNameNotFoundException(name);
    }
  }
}
