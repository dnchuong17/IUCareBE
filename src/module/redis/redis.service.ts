import { Injectable, Inject,  } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {CACHE_MANAGER} from "@nestjs/common/cache";

@Injectable()
export class RedisHelper {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }

    async get<T>(key: string): Promise<T | null> {
        return await this.cacheManager.get<T>(key);
    }

}
