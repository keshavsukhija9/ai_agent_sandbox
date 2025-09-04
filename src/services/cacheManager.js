// Redis-like caching system for FAANG performance
export class CacheManager {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map();
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      evictions: 0
    };
    this.maxSize = 1000;
    this.startCleanup();
  }

  // Set with TTL
  set(key, value, ttlMs = 300000) {
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }
    
    this.cache.set(key, {
      value,
      accessTime: Date.now(),
      createdAt: Date.now()
    });
    
    this.ttl.set(key, Date.now() + ttlMs);
    this.stats.sets++;
  }

  // Get with hit/miss tracking
  get(key) {
    if (!this.cache.has(key) || this.isExpired(key)) {
      this.stats.misses++;
      return null;
    }
    
    const item = this.cache.get(key);
    item.accessTime = Date.now();
    this.stats.hits++;
    return item.value;
  }

  // Atomic operations
  async getOrSet(key, factory, ttlMs = 300000) {
    let value = this.get(key);
    if (value === null) {
      value = await factory();
      this.set(key, value, ttlMs);
    }
    return value;
  }

  // Batch operations
  mget(keys) {
    return keys.map(key => this.get(key));
  }

  mset(entries, ttlMs = 300000) {
    entries.forEach(([key, value]) => {
      this.set(key, value, ttlMs);
    });
  }

  // LRU eviction
  evictLRU() {
    let oldestKey = null;
    let oldestTime = Date.now();
    
    for (const [key, item] of this.cache) {
      if (item.accessTime < oldestTime) {
        oldestTime = item.accessTime;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.ttl.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  isExpired(key) {
    const expiry = this.ttl.get(key);
    if (expiry && Date.now() > expiry) {
      this.cache.delete(key);
      this.ttl.delete(key);
      return true;
    }
    return false;
  }

  startCleanup() {
    setInterval(() => {
      for (const key of this.cache.keys()) {
        this.isExpired(key);
      }
    }, 60000);
  }

  getStats() {
    const hitRate = this.stats.hits / (this.stats.hits + this.stats.misses) || 0;
    return {
      ...this.stats,
      hitRate: Math.round(hitRate * 100),
      size: this.cache.size
    };
  }

  clear() {
    this.cache.clear();
    this.ttl.clear();
  }
}

export const cacheManager = new CacheManager();