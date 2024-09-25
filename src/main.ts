import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

/**
 * FONTES BASE PARA O DEPLOY NA VERCEL
 * https://medium.com/@jeremy.brunel.fullstack/deploying-a-nestjs-and-redis-app-on-vercel-as-easy-as-pie-eb15e2849717
 * https://www.youtube.com/watch?v=FZiza5N6BQU
 */
