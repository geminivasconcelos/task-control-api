import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  describe('createUsers', () => {
    it('should hash the password and save the user', async () => {
      const userDto = {
        name: 'Test',
        surname: 'User',
        email: 'test@example.com',
        password: 'plaintext123',
      };

      const hashedPassword = await bcrypt.hash(userDto.password, 10);

      (repository.create as jest.Mock).mockReturnValue({
        ...userDto,
        password: hashedPassword,
      });
      (repository.save as jest.Mock).mockResolvedValue({
        id: 1,
        ...userDto,
        password: hashedPassword,
      });

      const result = await service.createUsers(userDto);

      expect(result.password).not.toEqual(userDto.password);
      expect(await bcrypt.compare(userDto.password, result.password)).toBe(
        true,
      );

      expect(repository.create).toHaveBeenCalledWith({
        ...userDto,
        password: expect.any(String),
      });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw an error if save fails', async () => {
      const userDto = {
        name: 'Test',
        surname: 'User',
        email: 'teste@teste.com',
        password: 'plaintext123',
      };

      (repository.create as jest.Mock).mockReturnValue({
        ...userDto,
        password: 'hashedpassword',
      });

      (repository.save as jest.Mock).mockRejectedValue(new Error('DB error'));

      await expect(service.createUsers(userDto)).rejects.toThrow('DB error');
    });
  });

  describe('Get Users By Id', () => {
    it('should return the found user by ID', async () => {
      const mockUser = { id: 1, name: 'test' };

      (repository.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUsersById(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.getUsersById(999)).rejects.toThrow(
        'Usuário com id 999 não encontrado',
      );
    });
  });
});
