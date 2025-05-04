import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { SORT_ORDER } from '../constants/user.types';

export class GetListUsersDto {
  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Number of items',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  page: number;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Number of items',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  count: number;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Number of items to skip',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  offset: number;

  @ApiProperty({
    required: false,
    enum: SORT_ORDER,
    default: SORT_ORDER.DESC,
    type: 'string',
  })
  @IsOptional()
  @IsEnum(SORT_ORDER)
  sortDirection: SORT_ORDER = SORT_ORDER.DESC;
}
