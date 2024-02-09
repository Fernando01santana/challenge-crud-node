import { ApiProperty } from '@nestjs/swagger'; // Importar decorador do Swagger

export class LoginDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'E-mail do usuário',
  })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  password: string;
}

export class ResponseLoginDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDMwNjQyMzksImV4cCI6MTY0MzA2NDM5OSwic3ViIjoiYXV0aGVudGljYXRpb24ifQ.1JL6on_u5qXDNKREa7y8cY6oIR2UINPaxa2oGyXpMFU',
    description: 'Token de acesso JWT',
  })
  access_token: string;
}
