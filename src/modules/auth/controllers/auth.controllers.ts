import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../dto/auth.dto';
import { AuthenticationService } from '../services/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso' })
  @ApiBadRequestResponse({ description: 'Credenciais inválidas' })
  @ApiUnauthorizedResponse({ description: 'Credenciais não autorizadas' })
  async login(@Body() user: LoginDto): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.login(user);

    return { accessToken: accessToken.access_token };
  }
}
