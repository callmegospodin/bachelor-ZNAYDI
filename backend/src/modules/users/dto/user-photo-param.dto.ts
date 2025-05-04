import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserPhotoParamDto {
  @ApiProperty({
    name: 'photo',
    type: 'string',
    required: true,
    example: '1711292762966-image.jpeg',
    description: 'User photo',
  })
  @IsString()
  photo: string;
}
