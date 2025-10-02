import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 4000),
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dointechltd',
  // JWT_ALG: process.env.JWT_ALG || 'HS256', // Added JWT_ALG property
  // JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};



if (!env.MONGO_URI) {
  throw new Error('MONGO_URI missing. Add it to your .env');
}
