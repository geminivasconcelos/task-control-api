import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUsersDto } from './create-users.dto';

export class UpdateUsersDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
