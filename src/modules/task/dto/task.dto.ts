// task.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Levar o cachorro para passear',
    description: 'Descricao da tarefa',
  })
  title: string;
}

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Levar o gato no petshop',
    description: 'Descricao da tarefa',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'true',
    description: 'Valor que determina se a tarefa esta completa ou nao',
    required: false,
  })
  completed?: boolean;
}
