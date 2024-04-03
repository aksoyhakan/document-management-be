import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder } from './entity/folder.entity';
import { File } from 'src/file/entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, File])],
  controllers: [FolderController],
  providers: [FolderService],
})
export class FolderModule {}
