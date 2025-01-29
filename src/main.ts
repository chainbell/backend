import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { version } from '../package.json';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import * as multipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  if (process.env.ENABLE_SWAGGER !== '0') {
    const config = new DocumentBuilder()
      .setTitle('Specify your title here')
      .setDescription('Specify your description here..')
      .setVersion(version)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    await SwaggerModule.setup('docs', app, document);
  }

  if (process.env.GLOBAL_CORS === '1') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: [
        // Specify your domains here
      ],
      credentials: true,
    });
  }

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.register(multipart as any);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
