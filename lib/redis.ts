import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

// Initialize Redis client if environment variables are configured
export const redis = url && token ? new Redis({ url, token }) : null;

// Rate limiters (sliding window algorithm)
// Chatbot: Max 10 messages per 60 seconds per IP
export const chatRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "ratelimit:chat",
    })
  : null;

// Booking form: Max 3 submissions per 15 minutes per IP
export const bookingRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "900 s"),
      analytics: true,
      prefix: "ratelimit:booking",
    })
  : null;

/**
 * High-performance Cache-Aside pattern with Upstash Redis:
 * 1. Checks Redis in-memory cache (~2-5ms).
 * 2. On miss, calls fetcher() to obtain fresh data from slow source (DB, WordPress, Supabase).
 * 3. Saves to Redis with TTL (default 24h) and returns.
 * 4. Gracefully falls back to fetcher() if Redis is offline or not configured.
 */
export async function getCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 86400 // 24 hours default
): Promise<T> {
  if (redis) {
    try {
      const cached = await redis.get<T>(key);
      if (cached !== null && cached !== undefined) {
        return cached;
      }
    } catch (err) {
      console.warn(`[Redis Cache Read Error for key "${key}"]:`, err);
    }
  }

  const fresh = await fetcher();

  if (redis && fresh !== null && fresh !== undefined) {
    try {
      await redis.set(key, fresh, { ex: ttlSeconds });
    } catch (err) {
      console.warn(`[Redis Cache Write Error for key "${key}"]:`, err);
    }
  }

  return fresh;
}

/**
 * Invalidate a cached key in Redis
 */
export async function invalidateCache(key: string): Promise<boolean> {
  if (!redis) return false;
  try {
    await redis.del(key);
    return true;
  } catch (err) {
    console.warn(`[Redis Invalidate Error for key "${key}"]:`, err);
    return false;
  }
}

