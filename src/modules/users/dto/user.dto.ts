import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequestAndResponse {
  @ApiProperty({
    example: 'teste@teste.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ example: 'teste123', description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
