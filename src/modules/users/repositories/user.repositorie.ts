import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRequestAndResponse } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserRequestAndResponse): Promise<User> {
    try {
      const userCreate = await this.usersRepository.create(data);
      await this.usersRepository.save(userCreate);
      return userCreate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      const searchuser = await this.usersRepository.findOne({
        where: { email: email },
      });
      return searchuser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async find(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
