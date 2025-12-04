// src/redis.ts
import IORedis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

let client: IORedis.Redis | null = null;
try {
  client = new IORedis(redisUrl);
  client.on("error", (err) => console.error("Redis error:", err));
} catch (err) {
  console.warn("Unable to connect to Redis, continuing without cache", err);
}

export const redis = {
  get: async (key: string) => {
    if (!client) return null;
    return await client.get(key);
  },
  set: async (key: string, value: string, mode?: string, duration?: number) => {
    if (!client) return;
    if (mode && duration) {
      await client.set(key, value, mode as any, duration);
    } else {
      await client.set(key, value);
    }
  },
  del: async (key: string | string[]) => {
    if (!client) return;
    if (Array.isArray(key)) await client.del(...key);
    else await client.del(key);
  },
  keys: async (pattern: string) => {
    if (!client) return [] as string[];
    return await client.keys(pattern);
  }
};
