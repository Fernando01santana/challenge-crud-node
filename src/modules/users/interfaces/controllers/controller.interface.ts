import { CreateUserRequestAndResponse } from '../../dto/user.dto';

export interface UserControllerInterface {
  findAll(): Promise<CreateUserRequestAndResponse[]>;
  createUser(
    user: CreateUserRequestAndResponse,
  ): Promise<CreateUserRequestAndResponse>;
  authenticate(email: string, password: string): Promise<string | null>;
}
