import {
  BadRequestException,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MovieFilePipePipe implements PipeTransform {
  private readonly MAX_AVATAR_SIZE = 3 * 1024 * 1024 * 1024; // max size is 3Gb
  // only Mp4  videos are allowed
  private readonly ALLOWED_FILE_TYPE = ['video/mp4'];

  transform(value: any, metadata: ArgumentMetadata) {
    if (value.size > this.MAX_AVATAR_SIZE) {
      throw new BadRequestException('File exceeded the limit of 3Gb');
    }

    if (!this.ALLOWED_FILE_TYPE.includes(value.mimetype)) {
      throw new BadRequestException('Invalid file type(Mp4 allowed)');
    }

    return value;
  }
}
