import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Private-Network", true);
      res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      app.use(cors());
      next();
    
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
