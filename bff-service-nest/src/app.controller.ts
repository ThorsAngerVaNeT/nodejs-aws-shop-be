import { All, Controller, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @All(['/:service', '/:service/*'])
  async processAll(@Req() req, @Res() res) {
    const { body, method, originalUrl } = req;
    const result = await this.appService.processResponse(
      originalUrl,
      method,
      body,
    );

    return res
      .status(result.status)
      .set({ ...result.headers })
      .send(result.data);
  }
}
