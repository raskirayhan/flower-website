import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  API_PREFIX: z.string().default('/api'),
  DATABASE_URL: z
    .string()
    .default('postgresql://postgres:postgres@localhost:5432/flowermarket_db?schema=public'),
  JWT_SECRET: z.string().default('flowermarket_jwt_access_secret_key_2026'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_REFRESH_SECRET: z.string().default('flowermarket_jwt_refresh_secret_key_2026'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  STRIPE_SECRET_KEY: z.string().default('sk_test_demo_flowermarket_stripe_key'),
  STRIPE_WEBHOOK_SECRET: z.string().default('whsec_demo_webhook_secret_key'),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000').transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100').transform((val) => parseInt(val, 10)),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
}

export const env = parsedEnv.success ? parsedEnv.data : envSchema.parse({});
