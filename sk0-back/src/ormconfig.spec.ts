import { dataSourceOptionFactory } from "./ormconfig";
import { NodeEnv } from "./config/configuration";

describe("dataSourceOptionFactory", () => {
  it("should return the correct options for the test environment", () => {
    const dbConfig = {
      NODE_ENV: "test" as NodeEnv,
      DATABASE: "",
      DATABASE_URL: ""
    };
    const result = dataSourceOptionFactory(dbConfig);

    expect(result).toEqual({
      type: "sqlite",
      database: ":memory:",
      entities: ["src/**/*.entity.ts"],
      synchronize: true
    });
  });

  it("should return the correct options for the development environment", () => {
    const dbConfig = {
      NODE_ENV: "development" as NodeEnv,
      DATABASE: "dev.sqlite",
      DATABASE_URL: ""
    };
    const result = dataSourceOptionFactory(dbConfig);

    expect(result).toEqual({
      type: "sqlite",
      database: "dev.sqlite",
      entities: ["dist/**/*.entity.js"],
      synchronize: true
    });
  });

  it("should return the correct options for the production environment", () => {
    const dbConfig = {
      NODE_ENV: "production" as NodeEnv,
      DATABASE: "",
      DATABASE_URL: "postgres://localhost:5432/mydb"
    };
    const result = dataSourceOptionFactory(dbConfig);

    expect(result).toEqual({
      type: "postgres",
      url: "postgres://localhost:5432/mydb",
      entities: ["dist/**/*.entity.js"],
      synchronize: false,
      migrations: [__dirname + "/migrations/*.{ts,js}"]
    });
  });
});
