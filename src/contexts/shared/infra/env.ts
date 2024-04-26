import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().optional(),
  CLOUDFLARE_ENDPOINT: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
