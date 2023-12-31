import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class $File {
  private readonly baseUrl = '/uploads/';

  //   method to get url for a file that uploaded in public folder
  getPublicFileUrl(filename: string) {
    if (!filename) {
      return undefined;
    }
    return `${process.env.APP_URL}${process.env.PORT}${this.baseUrl}public/${filename}`;
  }

  getPublicFilePathAndName(filename: string) {
    const uniqueName: string = uuidv4() + path.extname(filename);
    return { path: `./uploads/public/${uniqueName}`, name: uniqueName };
  }

  getPublicFilePath(filename: string) {
    return `./uploads/public/${filename}`;
  }

  async checkExistenceOfFile(filePath: string): Promise<boolean> {
    try {
      await fs.promises.access(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  //   method to upload file
  async fileUpload(file: Express.Multer.File, filePath: string) {
    try {
      const writeStream = fs.createWriteStream(filePath);

      await new Promise((resolve, reject) => {
        writeStream.write(file.buffer, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        });
      });

      writeStream.end();
    } catch (error) {
      throw new InternalServerErrorException(
        'Got problems at backend while saving your file',
      );
    }
  }

  // remove file
  async deleteFile(filePath: string) {
    try {
      const isExist = await this.checkExistenceOfFile(filePath);
      if (!isExist) {
        return true;
      }

      await new Promise((resolve, reject) => {
        fs.unlink(filePath, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        });
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Got problems at backend while deleting your file',
      );
    }
  }
}
