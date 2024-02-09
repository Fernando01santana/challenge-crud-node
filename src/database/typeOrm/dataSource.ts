import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Task } from 'src/modules/task/entities/task.entitie';
import { User } from 'src/modules/users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

config();
const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [User, Task],
  migrations: ['dist/shared/migrations/*.js'],
  synchronize: false,
};

export const dataSourceConfig = new DataSource(dataSourceOptions);
