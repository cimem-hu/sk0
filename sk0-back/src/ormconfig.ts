import { DataSourceOptions } from "typeorm";

export function dataSourceOptionFactory(
  dbName: string,
  nodeEnv: string
): DataSourceOptions {
  let dataSourceOptions: DataSourceOptions;

  switch (nodeEnv) {
    case "test":
      dataSourceOptions = {
        type: "sqlite",
        database: ":memory:",
        entities: ["src/**/*.entity.ts"],
        synchronize: true
      };
      break;
    case "development":
      dataSourceOptions = {
        type: "sqlite",
        database: dbName || "dev.sqlite",
        entities: ["dist/**/*.entity.js"],
        synchronize: true
      };
      break;
    case "production":
      dataSourceOptions = {
        type: "postgres",
        database: "db.sqlite",
        entities: ["dist/**/*.entity.js"],
        synchronize: false,
        migrations: [__dirname + "/migrations/*.{ts,js}"]
      };
      break;
    default:
      dataSourceOptions = {
        type: "sqlite",
        database: dbName || "sample.sqlite",
        entities: ["dist/**/*.entity.js"],
        synchronize: true
      };
  }
  return dataSourceOptions;
}
