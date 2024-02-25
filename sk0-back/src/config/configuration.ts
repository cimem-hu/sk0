export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "super_secret_default_key",
  JWT_OPTIONS_EXPIRE: process.env.JWT_OPTIONS || "60m",
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_NAME: process.env.DB_NAME || "sample.sqlite"
});
