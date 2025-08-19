import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';
import { UpdatePasswordDto } from './update-password.dto';
import { Users } from './users.entity';
import { CreateUsersDto } from './create-users.dto';
import { LoginUsersDto } from './login-user.dto';

interface FormatLogin extends Partial<Users> {
  email: string;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUsers(user: CreateUsersDto) {
    try {
      const hashedPassword = await hash(user.password, 10);
      const newUser = this.usersRepository.create({
        ...user,
        password: hashedPassword,
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        'Erro ao criar usuário: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getUsersById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com id ${id} não encontrado`);
    }

    return user;
  }

  getAllUserss() {
    return this.usersRepository.find();
  }

  async updateUsers(
    id: string,
    user: CreateUsersDto,
  ): Promise<{ message: string }> {
    try {
      const { password, ...updateData } = user;

      const result = await this.usersRepository.update(id, updateData);

      if (!result.affected) {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
      }

      return { message: 'Usuário atualizado com sucesso' };
    } catch (error) {
      throw new HttpException(
        `Erro ao atualizar usuário: ${error.message || error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUsers(id: string): Promise<{ message: string }> {
    const result = await this.usersRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado`);
    }

    return { message: 'Usuário deletado com sucesso' };
  }
  
  async findByLogin({ email, password }: LoginUsersDto): Promise<FormatLogin> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const match = await compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async findByPayload({ email }: any): Promise<any> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async updatePassword(payload: UpdatePasswordDto, id: number): Promise<Users> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(payload.old_password, user.password);

    if (!areEqual) {
      throw new HttpException('invalid_credentials', HttpStatus.UNAUTHORIZED);
    }

    user.password = await hash(payload.new_password, 10);
    return this.usersRepository.save(user);
  }
}
