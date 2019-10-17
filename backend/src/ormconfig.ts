import * as env from 'dotenv';
env.config();

const isProd = process.env.NODE_ENV === 'production';
const entitiesExtension = isProd ? 'js' : 'ts';
const migrationsDir = isProd ? 'dist/migration' : 'migration';
const migrations = isProd ? 'dist/migration/*.js' : 'migration/*.ts';

const config = {
  ssl: process.env.NODE_ENV === 'production',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/**/*.entity.' + entitiesExtension],
  migrations: [migrations],
  migrationDir: [migrationsDir],
  cli: {
    migrationsDir,
  },
};

export default config;

module.exports = config;
