import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorGenericError } from 'src/shared/exceptions/user/user.exception';
import { PasswordUtils } from 'src/shared/utils/encryptPassword';
import { CreateUserRequestAndResponse } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { IUserService } from '../interfaces/services/user.service.interface';
import { UsersRepository } from '../repositories/user.repositorie';

@Injectable()
export class UserService implements IUserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordUtils: PasswordUtils,
  ) {}

  async createUser(
    data: CreateUserRequestAndResponse,
  ): Promise<CreateUserRequestAndResponse> {
    try {
      const userExists = await this.usersRepository.findOne(data.email);
      if (userExists) {
        throw new HttpException(
          'Usuario ja cadastrado na base.',
          HttpStatus.CONFLICT,
        );
      }

      const passwordEncrypted = await this.passwordUtils.hashPassword(
        data.password,
      );
      data.password = passwordEncrypted;

      const userCreated = await this.usersRepository.create(data);
      return { email: userCreated.email, password: userCreated.password };
    } catch (error) {
      throw new ErrorGenericError('Erro interno ao criar usuario');
    }
  }

  getUsers(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (error) {
      throw new ErrorGenericError('Erro interno ao listar usuarios');
    }
  }
}
