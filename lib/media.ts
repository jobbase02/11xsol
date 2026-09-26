import { supabase } from "@/lib/supabase";
import { redis } from "@/lib/redis";

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "site-assets";
const CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days cache

/**
 * Resolves an image URL:
 * 1. Checks Upstash Redis for cached public URL (~1ms).
 * 2. If missed, generates the public URL from Supabase Storage.
 * 3. Stores the URL in Redis for future requests.
 * 4. Falls back to local public path if Supabase is not configured.
 */
export async function getImageUrl(fileNameOrPath: string): Promise<string> {
  // Strip leading slash for Supabase storage path
  const cleanPath = fileNameOrPath.replace(/^\/+/, "").replace(/^public\//, "");
  const cacheKey = `img:url:${cleanPath}`;

  // 1. Try reading from Upstash Redis Cache
  if (redis) {
    try {
      const cachedUrl = await redis.get<string>(cacheKey);
      if (cachedUrl) {
        return cachedUrl;
      }
    } catch (err) {
      console.warn("[Redis Cache Error]:", err);
    }
  }

  // 2. Resolve from Supabase Storage
  let resolvedUrl = `/${cleanPath}`;
  if (supabase) {
    try {
      const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(cleanPath);
      if (data?.publicUrl) {
        resolvedUrl = data.publicUrl;

        // 3. Save to Redis Cache with TTL
        if (redis) {
          await redis.set(cacheKey, resolvedUrl, { ex: CACHE_TTL_SECONDS });
        }
      }
    } catch (err) {
      console.warn("[Supabase Storage Error]:", err);
    }
  }

  return resolvedUrl;
}

/**
 * Synchronous client & server helper:
 * Returns the Supabase CDN URL if NEXT_PUBLIC_SUPABASE_URL is set,
 * otherwise falls back cleanly to the local file path.
 */
export function getPublicMediaUrl(fileNameOrPath: string): string {
  const cleanPath = fileNameOrPath.replace(/^\/+/, "").replace(/^public\//, "");
  // Only route to remote Supabase Storage if explicitly activated by the user
  if (process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === "true") {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl.startsWith("http") && !supabaseUrl.includes("your-project")) {
      return `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${cleanPath}`;
    }
  }
  return `/${cleanPath}`;
}

/**
 * Batch resolves multiple image paths using Redis and Supabase fallback.
 */
export async function getImageUrls(paths: string[]): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  await Promise.all(
    paths.map(async (path) => {
      result[path] = await getImageUrl(path);
    })
  );
  return result;
}

/**
 * Resolves a signed URL for private assets with Redis caching:
 * Caches the signed URL for the duration of its validity minus 60s buffer.
 */
export async function getSignedImageUrl(
  fileNameOrPath: string,
  expiresInSeconds: number = 3600
): Promise<string | null> {
  const cleanPath = fileNameOrPath.replace(/^\/+/, "").replace(/^public\//, "");
  const cacheKey = `img:signed:${cleanPath}`;

  // 1. Check Redis Cache
  if (redis) {
    try {
      const cached = await redis.get<string>(cacheKey);
      if (cached) return cached;
    } catch (err) {
      console.warn("[Redis Cache Error for signed URL]:", err);
    }
  }

  // 2. Request new signed URL from Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(cleanPath, expiresInSeconds);

      if (!error && data?.signedUrl) {
        // 3. Cache in Redis (TTL = expiresInSeconds - 60s safety buffer)
        if (redis) {
          const ttl = Math.max(60, expiresInSeconds - 60);
          await redis.set(cacheKey, data.signedUrl, { ex: ttl });
        }
        return data.signedUrl;
      }
    } catch (err) {
      console.warn("[Supabase Signed URL Error]:", err);
    }
  }

  return null;
}


