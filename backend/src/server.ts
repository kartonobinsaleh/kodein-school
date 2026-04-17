import app from './app';
import { env } from './config/env';
import logger from './utils/logger';

const { PORT } = env;

app.listen(PORT, () => {
  logger.info(`🚀 SIS Backend running on http://localhost:${PORT}`);
  logger.info(`   ENV: ${env.NODE_ENV}`);
});
