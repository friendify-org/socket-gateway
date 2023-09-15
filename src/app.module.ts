import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './modules/socket/socket.module';
import { AuthGuard } from './guard/auth';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from './modules/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SocketModule,
    JwtModule.register({}),
    CacheModule,
  ],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
