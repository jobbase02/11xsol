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
