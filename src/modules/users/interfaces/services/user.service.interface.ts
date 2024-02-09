import { CreateUserRequestAndResponse } from '../../dto/user.dto';
import { User } from '../../entities/user.entity';

export interface IUserService {
  createUser(
    data: CreateUserRequestAndResponse,
  ): Promise<CreateUserRequestAndResponse>;
  getUsers(): Promise<User[]>;
}
