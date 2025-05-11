const cache = new Map<string, { data: any; expiry: number }>();

export function cacheMiddleware(ttlSeconds = 600) {
  return (req, res, next) => {
    const key = req.originalUrl;

    const cached = cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return res.json(cached.data);
    }

    const originalJson = res.json.bind(res);
    res.json = (data) => {
      cache.set(key, { data, expiry: Date.now() + ttlSeconds * 1000 });
      return originalJson(data);
    };

    next();
  };
} 