import { ApiProperty } from '@nestjs/swagger';

export class UserListType {
  @ApiProperty({ example: 'c3adcab6-d403-4563-80ff-dae1e0fe4e30' })
  id: string;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: '1' })
  positionId: number;

  @ApiProperty({ example: 'Security' })
  position: string;

  @ApiProperty({ example: 'Harry' })
  name: string;

  @ApiProperty({ example: '+380936548653' })
  phone: string;

  @ApiProperty({ example: '+1711384400250-Image.jpeg' })
  photo: string;
}

export class GetUserListResponseDto {
  count: number;
  page: number;
  totalPages: number;
  totalUsers: number;
  data: UserListType[];
}
