import {
  Controller,
  Get,
  Injectable,
  Logger,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  Client,
  ClientProxy,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { MessageException } from 'src/decorator/message_exception';
import { EmitSocketEvent } from './dto/emitSocketEvent';
import { validate } from 'class-validator';
import { AuthGuard } from 'src/guard/auth';

@Controller()
export class SocketConsumer {

  @MessagePattern('socket_emit')
  @MessageException()
  async emitSocketEvent(@Payload() data: EmitSocketEvent) {
    const errorsValidate = await validate(new EmitSocketEvent(data));
    if (errorsValidate.length > 0) throw errorsValidate;
  }
}
