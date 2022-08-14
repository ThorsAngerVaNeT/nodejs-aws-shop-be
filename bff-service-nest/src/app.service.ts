import {
  BadGatewayException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Method } from 'axios';

@Injectable()
export class AppService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  getServiceUrlFromOriginalUrl(originalUrl: string): string | undefined {
    const [, service] = originalUrl.split('/');
    const SERVICES = this.configService.get<string>('services');
    return SERVICES[service];
  }

  async processResponse(
    originalUrl: string,
    method: Method,
    body: Record<string, string>,
  ) {
    const serviceUrl = this.getServiceUrlFromOriginalUrl(originalUrl);

    if (!serviceUrl) {
      throw new BadGatewayException('Cannot process request');
    }

    try {
      const isCacheable = method === 'GET' && originalUrl === '/products';

      if (isCacheable) {
        const cache = await this.cacheManager.get(originalUrl);
        if (cache) {
          return cache;
        }
      }

      const response = await this.httpService.axiosRef.request({
        method,
        url: `${serviceUrl}${originalUrl}`,
        ...(Object.keys(body).length > 0 && { data: body }),
      });

      const result = {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };

      if (isCacheable) {
        const args = [originalUrl, result, { ttl: 120 }];
        await this.cacheManager.set(...args);
      }

      return result;
    } catch (e) {
      if (e.response) {
        return {
          status: e.response.status,
          data: e.response.data,
          headers: e.response.headers,
        };
      }
      throw new InternalServerErrorException(e.message);
    }
  }
}
