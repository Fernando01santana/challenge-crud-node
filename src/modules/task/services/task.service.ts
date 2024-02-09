// task.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorGenericTask } from 'src/shared/exceptions/tasks/tasks.exception';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { Task } from '../entities/task.entitie';
import { TaskRepository } from '../repositorie/task.repositorie';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title } = createTaskDto;
    const task = this.taskRepository.create(title);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.getById(id);
      if (!task) {
        throw new NotFoundException('Tarefa não encontrada');
      }
      return task;
    } catch (error) {
      throw new ErrorGenericTask('Erro interno ao buscar tarefa');
    }
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.getTaskById(id);
      const { title, completed } = updateTaskDto;
      if (title !== undefined) {
        task.title = title;
      }
      if (completed !== undefined) {
        task.completed = completed;
      }
      await this.taskRepository.update(
        task.id,
        task.title,
        updateTaskDto.completed,
      );
      return task;
    } catch (error) {
      throw new ErrorGenericTask('Erro interno ao atualizar tarefa');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.delete(id);
    } catch (error) {
      throw new ErrorGenericTask('Erro ao execular acao');
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      const tasks = await this.taskRepository.getAll();
      return tasks;
    } catch (error) {
      console.error(error);
      throw new ErrorGenericTask('Erro interno ao deletar tarefa');
    }
  }
}
