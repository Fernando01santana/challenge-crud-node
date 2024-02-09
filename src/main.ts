import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.startAllMicroservices();
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Em desenvolvimento')
    .setDescription(
      'O objetivo desta API é agilizar o processo de aplicacao de provas academicas.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8000, () => {
    console.log('server started at http://localhost:8000');
  });
}
bootstrap();
