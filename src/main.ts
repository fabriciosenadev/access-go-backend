import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do CORS
  app.enableCors({
    origin: 'https://*/', // Domínio permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Inclua 'OPTIONS'
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Se necessário
    optionsSuccessStatus: 204 // Para navegadores antigos
  });

  app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
  });

  // app.use((req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Origin', 'https://access-go-frontend.vercel.app');
  //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  //     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  //     res.header('Access-Control-Allow-Credentials', 'true');
  //     return res.status(204).send(); // Respondemos diretamente ao preflight
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
