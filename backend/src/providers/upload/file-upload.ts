import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class $File {
  private readonly baseUrl = '/uploads/';
  private readonly maxFileSize = 5000; // in bytes

  //   method to get url for a file that uploaded in public folder
  getPublicFileUrl(filename: string) {
    if (!filename) {
      return undefined;
    }
    return `${process.env.APP_URL}${process.env.PORT}${this.baseUrl}public/${filename}`;
  }

  getPublicFilePath(filename: string) {
    return `./uploads/public/${filename}`;
  }

  //   method to upload file in public folder
  publicUpload(req: Request, file: Express.Multer.File, callback: any) {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedFileTypes.includes(file.mimetype)) {
      return callback(new BadRequestException('Invalid file type'), false);
    }

    if (file.size > this.maxFileSize) {
      return callback(
        new BadRequestException('File size exceeds the limit'),
        false,
      );
    }

    // If validation passes, save the file
    const uniqueSuffix = uuidv4();
    const extension = path.extname(file.originalname);
    const filename = uniqueSuffix + extension;

    callback(null, filename);
  }

  // remove file
  deleteFile(filePath: string) {
    console.log(filePath);

    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          console.log(error);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
