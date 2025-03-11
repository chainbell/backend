import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Wakzoo Life API')
    .setDescription('Nest.js API with Swagger')
    .setVersion('1.0')
    .addBearerAuth() // Authorization 헤더 추가
    .addApiKey({ // 🔥 커스텀 헤더 추가
      type: 'apiKey',
      name: 'AuthServiceType',
      in: 'header',
      description: 'Authorization Type(NAVER, GOOGLE)',
    }, 'custom-header') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}