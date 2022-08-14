import {
  CacheInterceptor,
  CallHandler,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const key = this.trackBy(context);
    if (key !== '/products' || !key) {
      return next.handle();
    }

    try {
      const value = await this.cacheManager.get(key);
      if (value) {
        return of(value);
      }
      return next.handle().pipe(
        tap((response) => {
          const args = [key, response, { ttl: 120 }];
          this.cacheManager.set(...args);
        }),
      );
    } catch {
      return next.handle();
    }
  }
}
