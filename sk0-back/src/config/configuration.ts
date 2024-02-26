export type NodeEnv = "test" | "development" | "production";

export type DbConfigOptions = {
  NODE_ENV: NodeEnv;
  DATABASE: string;
  DATABASE_URL: string;
};

export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "super_secret_default_key",
  JWT_OPTIONS_EXPIRE: process.env.JWT_OPTIONS || "60m",
  DB_CONFIG: {
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE: process.env.DATABASE || "development.sqlite",
    DATABASE_URL: process.env.DATABASE_URL
  } as DbConfigOptions
});
