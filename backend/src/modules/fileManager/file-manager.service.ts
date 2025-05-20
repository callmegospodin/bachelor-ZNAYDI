import * as fs from 'fs';

import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { AWSError, S3 } from 'aws-sdk';
import * as sharp from 'sharp';

import 'dotenv/config';
import { PromiseResult } from 'aws-sdk/lib/request';
import { PHOTO_WIDTH, PHOTO_HEIGHT } from '@src/constants/constants';
import { AWSUtil } from '@src/utils/aws.utils';

@Injectable()
export class FileManagerService {
  private readonly logger = new Logger(FileManagerService.name);

  async uploadFileToS3(filePath: string, fileName: string, fileType: string): Promise<string> {
    this.logger.log('Uploading file to S3');

    try {
      const base64 = fs.readFileSync(filePath);

      await sharp(base64)
        .resize({
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
        })
        .toBuffer()
        .then((data) => {
          //eslint-disable-next-line @typescript-eslint/no-misused-promises
          fs.writeFile(filePath, data, 'binary', async (error) => {
            if (!error) {
              await AWSUtil.uploadToS3(filePath, fileName, fileType);

              fs.unlinkSync(filePath);
            } else {
              throw new UnprocessableEntityException('Can not write to file');
            }
          });
        });

      return fileName;
    } catch (err) {
      throw new UnprocessableEntityException('S3 bucket error');
    }
  }

  async deleteFile(fileKey: string): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> {
    const s3 = new S3();

    try {
      return await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
        })
        .promise();
    } catch (err) {
      throw new UnprocessableEntityException('Delete file from S3 bucket error');
    }
  }

  async getFile(fileKey: string): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    const s3 = new S3();

    try {
      return await s3
        .getObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
        })
        .promise();
    } catch (err) {
      throw new UnprocessableEntityException('Get file from S3 bucket error');
    }
  }
}
