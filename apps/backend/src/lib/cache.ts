import cacheManager from "cache-manager";

export const cache = cacheManager.caching({
  store: "memory",
  max: 100,
  ttl: 60 * 5, // 5 minutes
}); 