import { DataSourceOptions } from "typeorm";

type NodeEnv = "test" | "development" | "production";

export type DbConfigOptions = {
  NODE_ENV: NodeEnv;
  DATABASE: string;
  HOST: string;
  PORT: number;
  USER: string;
  PASSWORD?: string;
};

export function dataSourceOptionFactory(
  dbConfig: DbConfigOptions
): DataSourceOptions {
  const dataSourceMap = new Map<string, DataSourceOptions>([
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
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        database: dbConfig.DATABASE,
        username: dbConfig.USER,
        password: dbConfig.PASSWORD,
        entities: ["dist/**/*.entity.js"],
        synchronize: false,
        migrations: [__dirname + "/migrations/*.{ts,js}"]
      }
    ]
  ]);

  return dataSourceMap.get(dbConfig.NODE_ENV || "development");
}
