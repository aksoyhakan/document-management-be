import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from 'src/folder/entity/folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File, Folder])],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
