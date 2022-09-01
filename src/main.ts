import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use((req, res, next) => {

    if (req.method == 'DELETE') {
      console.log('salve');
      const token = req.headers['x-access-token'];
      if (token != process.env.SECRET) {
        return res
          .status(500)
          .json({ auth: false, message: 'Failed to authenticate token.' });
      }
    }
    next();
  });

  await app.listen(process.env.PORT);
}
bootstrap();
