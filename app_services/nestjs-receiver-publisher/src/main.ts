import { NestFactory } from '@nestjs/core';
import { natsStreamConfig } from './config.nats';
import { DatasModule } from './datas/datas.module';


async function bootstrap() {
  const app = await NestFactory.create(DatasModule, {cors: true});
  app.connectMicroservice(natsStreamConfig);
  app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
