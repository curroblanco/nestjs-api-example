import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ConnectionOptions } from 'typeorm';

const envconfig = dotenv.parse(fs.readFileSync('.env'));

const config: ConnectionOptions = {
  type: 'postgres',
  host: envconfig['DB_HOST'],
  port: parseInt(envconfig['DB_PORT']),
  username: envconfig['DB_USER'],
  password: envconfig['DB_PASS'],
  database: envconfig['DB_NAME'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  },
};

export = config;