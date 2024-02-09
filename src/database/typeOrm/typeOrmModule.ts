import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './dataSource';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        try {
          await dataSourceConfig.initialize();
          return dataSourceConfig;
        } catch (error) {
          console.error('Erro na inicialização do DataSource:', error);
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {}
