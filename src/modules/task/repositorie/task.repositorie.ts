import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entitie';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(title: string): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.completed = false;
    return await this.taskRepository.save(task);
  }

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getById(id: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id: id } });
  }

  async update(id: string, title: string, completed: boolean): Promise<Task> {
    const task = await this.getById(id);
    task.title = title;
    task.completed = completed;
    return await this.taskRepository.save(task);
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
