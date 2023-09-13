import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import environment from './config/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Connect rabbit mq
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [environment().amqpUri],
      queue: environment().queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
