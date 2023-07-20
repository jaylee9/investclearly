import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';
import path from 'path';
import { User } from '../entities/user.entity';
import { Deal } from '../entities/deals.entity';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
  entities: [User, Deal],
};

export const AppDataSource = new DataSource({
  ...config,
  migrations: ['src/backend/database/migrations/*'],
} as DataSourceOptions);

const dataSource = new DataSource(config as DataSourceOptions);

export const getDatabaseConnection = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
};
