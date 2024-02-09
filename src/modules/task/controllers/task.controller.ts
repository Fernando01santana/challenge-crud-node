// task.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { Task } from '../entities/task.entitie';
import { TaskService } from '../services/task.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiBody({ type: CreateTaskDto })
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @ApiOperation({ summary: 'Pegar todas as tarefas' })
  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @ApiOperation({ summary: 'Pegar tarefa por id' })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @ApiOperation({
    summary: 'Atualizar tarefa por id',
    description:
      'Marque a task como completa passando o valor true no campo completed que tambem e opcional',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTaskDto })
  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'deletar tarefa' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
