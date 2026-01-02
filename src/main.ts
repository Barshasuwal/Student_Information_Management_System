import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe} from '@nestjs/common'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API endpoints for this project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'api';
  SwaggerModule.setup(swaggerPath, app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // Log app URL and Swagger URL
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📄 Swagger docs available at: http://localhost:${port}/${swaggerPath}`);
}
bootstrap();
