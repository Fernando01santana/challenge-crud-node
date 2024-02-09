import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/shared/decorators/tokenValidation';
import { UtilsModule } from 'src/shared/utils/utils.module';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repositorie';
import { UserService } from './services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UtilsModule],
  controllers: [UsersController],
  providers: [UserService, UsersRepository],
  exports: [UsersRepository, UserService, TypeOrmModule.forFeature([User])],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/users/', method: RequestMethod.GET });
  }
}
