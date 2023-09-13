import { Module } from '@nestjs/common';
import { SocketConsumer } from './socket.consumer';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [SocketConsumer],
})
export class SocketModule {}
