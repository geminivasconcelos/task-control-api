import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUsersDto } from '../users/create-users.dto';
import { LoginUsersDto } from '../users/login-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  const mockUser = {
    email: 'test@example.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    usersService = {
      createUsers: jest.fn().mockResolvedValue(mockUser),
      findByLogin: jest.fn().mockResolvedValue(mockUser),
      findByPayload: jest.fn().mockResolvedValue(mockUser),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mockToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  describe('register', () => {
    it('should register a user and return success status', async () => {
      const dto: CreateUsersDto = {
        name: 'Test',
        surname: 'User',
        email: 'test@example.com',
        password: '123456',
      };

      const result = await service.register(dto);

      expect(result).toEqual({
        success: true,
        message: 'ACCOUNT_CREATE_SUCCESS',
        data: mockUser,
      });
    });

    it('should return failure status on error', async () => {
      (usersService.createUsers as jest.Mock).mockRejectedValue('EMAIL_TAKEN');

      const dto: CreateUsersDto = {
        name: 'Test',
        surname: 'User', // Opcional, pode remover se quiser
        email: 'test@example.com',
        password: '123456', // Lembre-se: precisa ter no mínimo 6 caracteres
      };

      const result = await service.register(dto);

      expect(result).toEqual({
        success: false,
        message: 'EMAIL_TAKEN',
      });
    });

    describe('login', () => {
      it('should return token and user data on successful login', async () => {
        const dto: LoginUsersDto = {
          email: 'test@example.com',
          password: '123',
        };
        const result = await service.login(dto);

        expect(result).toEqual({
          expiresIn: process.env.EXPIRESIN,
          Authorization: 'mockToken',
          data: mockUser,
        });

        expect(usersService.findByLogin).toHaveBeenCalledWith(dto);
        expect(jwtService.sign).toHaveBeenCalledWith({ email: mockUser.email });
      });
    });

    describe('validateUser', () => {
      it('should return user if payload is valid', async () => {
        const payload = { email: 'test@example.com' };
        const result = await service.validateUser(payload);

        expect(result).toEqual(mockUser);
        expect(usersService.findByPayload).toHaveBeenCalledWith(payload);
      });

      it('should throw HttpException if user not found', async () => {
        (usersService.findByPayload as jest.Mock).mockResolvedValue(null);

        await expect(
          service.validateUser({ email: 'invalid@example.com' }),
        ).rejects.toThrow(
          new HttpException('INVALID_TOKEN', HttpStatus.UNAUTHORIZED),
        );
      });
    });
  });
});
