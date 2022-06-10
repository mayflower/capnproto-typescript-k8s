import { NestFactory } from '@nestjs/core';
import { natsStreamConfig } from 'src/config.nats';
import { DatasModule } from './datas/datas.module';

async function bootstrap() {
  const app = await NestFactory.create(DatasModule);
  app.connectMicroservice(natsStreamConfig);
  app.startAllMicroservices();

  await app.listen(3002);
}
bootstrap();
