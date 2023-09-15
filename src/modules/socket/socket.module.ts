import { Module } from '@nestjs/common';
import { SocketConsumer } from './socket.consumer';
import { SocketGateway } from './socket.gateway';
import { JwtModule } from '@nestjs/jwt';
import environment from 'src/config/environment';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [
    JwtModule.register({
      secret: environment().jwtSecret,
    }),
    CacheModule,
  ],
  providers: [SocketGateway],
  exports: [],
  controllers: [SocketConsumer],
})
export class SocketModule {}
