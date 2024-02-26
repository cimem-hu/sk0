export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "super_secret_default_key",
  JWT_OPTIONS_EXPIRE: process.env.JWT_OPTIONS || "60m",
  DB_CONFIG: {
    ENV: process.env.NODE_ENV || "development",
    DATABASE: process.env.DATABASE || "development.sqlite",
    HOST: process.env.DB_HOST || "localhost",
    PORT: parseInt(process.env.DB_PORT, 10) || 5432,
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "postgres"
  }
});
