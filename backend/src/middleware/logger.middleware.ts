import morgan from 'morgan';
import logger from '../utils/logger';

// Morgan custom stream to redirect logs to Winston
const stream = {
  /**
   * Use Winston's 'info' level for HTTP request logs.
   * Morgan includes a newline (\n) by default, so we remove it.
   */
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Morgan middleware configuration
// Log pattern: HTTP-method URL status response-time-ms
const loggerMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

export default loggerMiddleware;
