import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { Users } from '../users/users.entity'; 
import { UsersService } from '../users/users.service';
import { CreateUsersDto } from '../users/create-users.dto';
import { LoginUsersDto } from '../users/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(userDto: CreateUsersDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'ACCOUNT_CREATE_SUCCESS',
    };

    try {
      status.data = await this.usersService.createUsers(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async login(loginUserDto: LoginUsersDto): Promise<any> {
    const user = await this.usersService.findByLogin(loginUserDto);

   
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  private _createToken({ email }): any {
    const user: JwtPayload = { email };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: process.env.EXPIRESIN,
      Authorization,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: Users;
}

export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: Users[];
}
