import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserRequestAndResponse } from '../dto/user.dto';
import { UserService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Retorna todos os usuarios' })
  @Get()
  @ApiResponse({ status: 200, description: 'Usuarios retornados com sucesso' })
  async findAll(): Promise<CreateUserRequestAndResponse[]> {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserRequestAndResponse })
  @Post('create')
  @ApiResponse({ status: 200, description: 'Usuarios criado com sucesso' })
  async createUser(
    @Body() user: CreateUserRequestAndResponse,
  ): Promise<CreateUserRequestAndResponse> {
    return this.usersService.createUser(user);
  }
}
