import 'dotenv/config';

declare var process: any;
export default {
  datasource: {
    url: process.env.DATABASE_URL,
  },
};
