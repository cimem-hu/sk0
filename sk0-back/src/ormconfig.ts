import { DataSourceOptions } from "typeorm";
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
        synchronize: true
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
  console.log("hello");
  return dataSourceMap.get(dbConfig.NODE_ENV);
}
