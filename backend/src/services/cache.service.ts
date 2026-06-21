import * as crypto from 'crypto';

class SimpleLRUCache<K, V> {
    private max: number;
    private cache: Map<K, V>;

    constructor(max = 500) {
        this.max = max;
        this.cache = new Map<K, V>();
    }

    public get(key: K): V | undefined {
        const item = this.cache.get(key);
        if (item !== undefined) {
            // Delete and re-insert to mark as most recently used
            this.cache.delete(key);
            this.cache.set(key, item);
        }
        return item;
    }

    public set(key: K, val: V): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.max) {
            // Remove the oldest item (first item in Map keys)
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey !== undefined) {
                this.cache.delete(oldestKey);
            }
        }
        this.cache.set(key, val);
    }

    public clear(): void {
        this.cache.clear();
    }

    public size(): number {
        return this.cache.size;
    }
}

export class CacheService {
    // Shared LRU Cache singletons
    public static readonly runCache = new SimpleLRUCache<string, any>(500);
    public static readonly traceCache = new SimpleLRUCache<string, any>(500);
    public static readonly complexityCache = new SimpleLRUCache<string, any>(500);
    public static readonly flowchartCache = new SimpleLRUCache<string, any>(500);

    /**
     * Compute a unique cache key using SHA-256
     */
    public static getCacheKey(...parts: string[]): string {
        const hash = crypto.createHash('sha256');
        parts.forEach(p => hash.update(p || ''));
        return hash.digest('hex');
    }

    /**
     * Clear all active caches
     */
    public static clearAll(): void {
        this.runCache.clear();
        this.traceCache.clear();
        this.complexityCache.clear();
        this.flowchartCache.clear();
    }
}
