import { ApiProperty } from '@nestjs/swagger';

export class GetUserResponseType {
  @ApiProperty({ example: 'ff35e180-9f00-4631-a846-8e8024b45b56' })
  id: string;

  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Harry' })
  name: string;

  @ApiProperty({ example: '+380936548653' })
  phone: string;
}
