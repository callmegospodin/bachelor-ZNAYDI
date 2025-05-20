import { extname } from 'path';

import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

import { FileManagerService } from './file-manager.service';

@Controller('upload-s3')
export class FileManagerController {
  constructor(private fileManagerService: FileManagerService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFileToS3(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.fileManagerService.uploadFileToS3(file.path, file.filename, file.mimetype);
  }
}
