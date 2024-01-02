import {
  BadRequestException,
  ArgumentMetadata,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class AvatarFilePipePipe implements PipeTransform {
  private readonly MAX_AVATAR_SIZE = 1 * 1024 * 1024; // max size is 1mb
  // only jpeg jpg and png images are allowed
  private readonly ALLOWED_FILE_TYPE = ['image/png', 'image/jpg', 'image/jpeg'];

  transform(value: any, metadata: ArgumentMetadata) {
    if (value.size > this.MAX_AVATAR_SIZE) {
      throw new BadRequestException('File exceeded the limit of 1Mb');
    }

    if (!this.ALLOWED_FILE_TYPE.includes(value.mimetype)) {
      throw new BadRequestException(
        'Invalid file type(jpg,jpegs and png allowed)',
      );
    }

    return value;
  }
}
