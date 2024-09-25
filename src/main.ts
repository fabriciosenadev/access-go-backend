import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });

  // Middleware para lidar com requisições preflight manualmente
  // app.use((req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Origin', '*');
  //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //     return res.status(200).json({});
  //   }
  //   next();
  // });

  await app.listen(3000);
}
bootstrap();

/**
 * FONTES BASE PARA O DEPLOY NA VERCEL
 * https://medium.com/@jeremy.brunel.fullstack/deploying-a-nestjs-and-redis-app-on-vercel-as-easy-as-pie-eb15e2849717
 * https://www.youtube.com/watch?v=FZiza5N6BQU
 */
