import {
  Body,
  UseGuards,
  Controller,
  Delete,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAll() {
    return this.fileService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('search')
  getNameQuery(@Query('name') name: string) {
    return this.fileService.getQueryName(name);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getById(@Param('id') folderId: number) {
    return this.fileService.findById(folderId);
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { folderId: number },
  ) {
    return this.fileService.create({
      ...body,
      name: file?.originalname,
      data: file?.buffer,
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') folderId: number) {
    return this.fileService.delete(folderId);
  }
}
