import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '../entities/user.entity';
import { Deal } from '../entities/deals.entity';
import { Sponsor } from '../entities/sponsors.entity';
import { Attachment } from '../entities/attachments.entity';
import { loadEnvConfig } from './load-env-config';
import { Review } from '../entities/reviews.entity';
import { Investment } from '../entities/investments.entity';
import { Bookmark } from '../entities/bookmark.entity';

loadEnvConfig();

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
  entities: [User, Deal, Sponsor, Attachment, Review, Investment, Bookmark],
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
