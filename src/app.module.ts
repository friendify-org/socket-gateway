import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './modules/socket/socket.module';
import { AuthGuard } from './guard/auth';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot(), SocketModule],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
