import config from "./configuration";

describe("configuration", () => {
  it("should return the correct configuration", () => {
    process.env = Object.assign(process.env, {
      PORT: "5000",
      JWT_SECRET: "test_secret",
      JWT_OPTIONS: "120m",
      NODE_ENV: "test",
      DATABASE: "test.sqlite",
      DATABASE_URL: "test_database_url"
    });

    const expectedConfig = {
      PORT: 5000,
      JWT_SECRET: "test_secret",
      JWT_OPTIONS_EXPIRE: "120m",
      DB_CONFIG: {
        NODE_ENV: "test",
        DATABASE: "test.sqlite",
        DATABASE_URL: "test_database_url"
      }
    };

    expect(config()).toEqual(expectedConfig);
  });

  it("should return the default configuration if no environment variables are set", () => {
    process.env = {};

    const expectedConfig = {
      PORT: 3000,
      JWT_SECRET: "super_secret_default_key",
      JWT_OPTIONS_EXPIRE: "60m",
      DB_CONFIG: {
        NODE_ENV: "development",
        DATABASE: "development.sqlite",
        DATABASE_URL: undefined
      }
    };

    expect(config()).toEqual(expectedConfig);
  });
});
