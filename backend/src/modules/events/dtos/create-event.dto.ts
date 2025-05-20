import { IsEnum, IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

import { EVENT_TYPE_ENUM } from '../constants/events.constant';

export class CreateEventDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  dateTime: string;

  @IsEnum(EVENT_TYPE_ENUM)
  @IsString()
  @IsOptional()
  type: EVENT_TYPE_ENUM;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsInt()
  @IsOptional()
  participants: number;

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsUUID('all')
  @IsString()
  @IsOptional()
  categoryId: string;
}
