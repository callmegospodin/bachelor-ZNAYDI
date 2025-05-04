import * as path from 'path';

import 'dotenv/config';
import { PinoLogger } from 'nestjs-pino';
import { DataSourceOptions } from 'typeorm';

export const getDataSourceConfig = (logger?: PinoLogger): DataSourceOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  schema: process.env.DB_SCHEMA,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: true,
});
