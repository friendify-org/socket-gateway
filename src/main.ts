import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import environment from './config/environment';
import { AppDeserializer } from './config/deserializer';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config validation data
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  // Connect rabbit mq
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [environment().amqpUri],
      queue: environment().queueName,
      queueOptions: {
        durable: true,
      },
      deserializer: new AppDeserializer(),
    },
  });

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
