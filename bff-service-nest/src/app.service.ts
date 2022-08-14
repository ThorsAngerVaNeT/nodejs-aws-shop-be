import {
  BadGatewayException,
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
    console.log('body', body, method);
    const serviceUrl = this.getServiceUrlFromOriginalUrl(originalUrl);

    if (!serviceUrl) {
      throw new BadGatewayException('Cannot process request');
    }

    try {
      const result = await this.httpService.axiosRef.request({
        method,
        url: `${serviceUrl}${originalUrl}`,
        ...(Object.keys(body).length > 0 && { data: body }),
      });

      return {
        status: result.status,
        data: result.data,
        headers: result.headers,
      };
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
