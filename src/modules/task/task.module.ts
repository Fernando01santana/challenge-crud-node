// task.module.ts

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/shared/decorators/tokenValidation';
import { TaskController } from './controllers/task.controller';
import { Task } from './entities/task.entitie';
import { TaskRepository } from './repositorie/task.repositorie';
import { TaskService } from './services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/tasks/', method: RequestMethod.POST },
        { path: '/tasks/', method: RequestMethod.GET },
        { path: '/tasks/:id', method: RequestMethod.GET },
        { path: '/tasks/:id', method: RequestMethod.PUT },
        { path: '/tasks/:id', method: RequestMethod.DELETE },
      );
  }
}
