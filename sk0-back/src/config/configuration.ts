export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECTER: process.env.JWT_SECRET || 'super_secret_default_key',
});
