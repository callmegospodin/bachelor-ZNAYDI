import * as fs from 'fs';

import { S3 } from 'aws-sdk';

import 'dotenv/config';

export class AWSUtil {
  public static async uploadToS3(filePath: string, fileName: string, fileType: string): Promise<S3.ManagedUpload.SendData> {
    const s3 = new S3();

    const blob = fs.readFileSync(filePath);
    fileName = fileName.replace(/\s/g, '');
    const uploadedImage = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: blob,
        ContentType: fileType,
      })
      .promise();

    fs.unlinkSync(filePath);

    return uploadedImage;
  }
}
