import { IsEmail, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(96)
  @IsString()
  email: string;

  @MaxLength(20)
  @MinLength(5)
  @IsString()
  password: string;

  @MaxLength(96)
  @MinLength(2)
  @IsString()
  firstName: string;

  @MaxLength(96)
  @MinLength(2)
  @IsString()
  lastName: string;

  @MaxLength(13)
  @MinLength(13)
  @IsString()
  @IsOptional()
  phone: string;

  @IsInt()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  photoUrl: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  city: string;
}
