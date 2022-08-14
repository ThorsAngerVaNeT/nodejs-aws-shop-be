import { All, Controller, Req, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpCacheInterceptor } from './http-cache-interceptor';

@Controller()
@UseInterceptors(HttpCacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @All(['/:service', '/:service/:id'])
  async processAll(@Req() req, @Res() res) {
    const { body, method } = req;
    const result = await this.appService.processResponse(
      req.originalUrl,
      method,
      body,
    );

    return res
      .status(result.status)
      .set({ ...result.headers })
      .send(result.data);
  }
}
