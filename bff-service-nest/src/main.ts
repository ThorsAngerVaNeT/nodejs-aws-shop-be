import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port, '0.0.0.0', () => {
    console.log(`Nest.js and running on port: ${port}`);
  });
}
bootstrap();
