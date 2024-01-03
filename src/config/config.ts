import * as dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT: number = process.env.PORT ? Number(process.env.PORT) : 5001;
const ENV: string = process.env.ENV || '';
const JWT_SECRET: string = process.env.JWT_SECRET || 'fakeKey';

const config = {
  server: {
    port: SERVER_PORT,
    env: ENV,
    jwtSecret: JWT_SECRET,
  },
};

export default config;
