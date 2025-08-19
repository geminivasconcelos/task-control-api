import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { UpdatePasswordDto } from './update-password.dto';
import { UpdateUsersDto } from './update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  public async me(@Request() req) {
    return new RenderUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(
    @Request() req,
    @Body()
    updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.userService.updatePassword(updatePasswordDto, req.user.id);
    return {
      message: 'password_update_success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('update')
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUsersDto) {
    return await this.userService.updateUsers(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('update')
  async deleteUser(@Request() req) {
    return await this.userService.deleteUser(req.user.id);
  }
}
export class RenderUser {
  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }

  id: number;
  name: string;
  email: string;
}
