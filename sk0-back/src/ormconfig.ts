import { DataSource, DataSourceOptions } from 'typeorm';

const { NODE_ENV, DB_NAME } = process.env;

let dataSourceOptions: DataSourceOptions;

switch (NODE_ENV) {
  case 'test':
    dataSourceOptions = {
      type: 'sqlite',
      database: ':memory:',
      entities: ['src/**/*.entity.ts'],
      synchronize: true,
    };
    break;
  case 'development':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'dev.sqlite',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
    break;
  case 'production':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      migrations: [__dirname + '/migrations/*.{ts,js}'],
    };
    break;
  default:
    dataSourceOptions = {
      type: 'sqlite',
      database: DB_NAME || 'sample.sqlite',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
}

export const dataSource: DataSource = new DataSource(dataSourceOptions);
