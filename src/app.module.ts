import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './database/typeOrm/typeOrmModule';
import { AuthenticationModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule,
    UsersModule,
    AuthenticationModule,
    TaskModule,
  ],
})
export class AppModule {}
