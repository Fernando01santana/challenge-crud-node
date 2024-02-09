interface DataSourceConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: Array<any>; // Aqui, você pode usar 'any' para evitar problemas de tipo
  migrations: string[];
  synchronize: boolean;
}
