import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('API для менеджера товаров (тестовое задание)')
    .setVersion('1.0')
    .addTag('products')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
  console.log(`🚀 Server running on http://localhost:3001`);
  console.log(`📘 Swagger docs available at http://localhost:3001/api/docs`);
}
void bootstrap();
