import {
  Body,
  UseGuards,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.folderService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('search')
  getNameQuery(@Query('name') name: string) {
    return this.folderService.getQueryName(name);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getById(@Param('id') folderId: number) {
    return this.folderService.findById(folderId);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() body: CreateFolderDto) {
    return this.folderService.create(body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') folderId: number) {
    return this.folderService.delete(folderId);
  }
}
