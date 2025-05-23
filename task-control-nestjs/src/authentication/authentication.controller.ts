import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthenticationService,
  RegistrationStatus,
} from './authentication.service';
import { LoginUsersDto } from 'src/users/login-user.dto';
import { CreateUsersDto } from 'src/users/create-users.dto';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUsersDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUsersDto): Promise<any> {
    return await this.authService.login(loginUserDto);
  }
}
