import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [ConfigModule.forRoot(), SocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
