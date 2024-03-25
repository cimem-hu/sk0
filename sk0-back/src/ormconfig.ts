import { DataSource, DataSourceOptions } from "typeorm";
import { DbConfigOptions, NodeEnv } from "./config/configuration";

export function dataSourceOptionFactory(
  dbConfig: DbConfigOptions
): DataSourceOptions {
  const dataSourceMap = new Map<NodeEnv, DataSourceOptions>([
    [
      "test",
      {
        type: "sqlite",
        database: ":memory:",
        entities: ["src/**/*.entity.ts"],
        synchronize: true
      }
    ],
    [
      "development",
      {
        type: "sqlite",
        database: dbConfig.DATABASE || "dev.sqlite",
        entities: ["dist/**/*.entity.js"],
        synchronize: false
      }
    ],
    [
      "production",
      {
        type: "postgres",
        url: dbConfig.DATABASE_URL,
        entities: ["dist/**/*.entity.js"],
        synchronize: false,
        migrations: [__dirname + "/migrations/*.{ts,js}"]
      }
    ]
  ]);
  return dataSourceMap.get(dbConfig.NODE_ENV);
}

export const dataSource = new DataSource({
  type: "sqlite",
  database: "development.sqlite",
  entities: ["dist/**/*.entity.js"],
  synchronize: true,
  migrations: [__dirname + "/migrations/*.{ts,js}"]
});
