import { Section } from './../../../node_modules/@cspotcode/source-map-support/node_modules/@jridgewell/trace-mapping/dist/types/types.d';
import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { AuthGuard } from 'src/guard/auth';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import environment from 'src/config/environment';
import { CacheService } from '../cache/cache.service';

@WebSocketGateway(4000, { cors: '*' })
export class SocketGateway {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      // Authorization when establish connection
      const authorizationHeader = client.handshake.headers['authorization'];
      if (!authorizationHeader) {
        return client.disconnect();
      }
      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        return client.disconnect();
      }
      const user = this.jwtService.verify(accessToken, {
        secret: environment().jwtSecret,
      });
      console.log(client);
      if (!user?.id) return client.disconnect();

      // Save connection
      this.cacheService.addConnection(user.id, client);
    } catch (err) {
      console.log(err);
      return client.disconnect();
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    const authorizationHeader = client.handshake.headers['authorization'];
    if (!authorizationHeader) {
      return client.disconnect();
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return client.disconnect();
    }
    const user = this.jwtService.verify(accessToken, {
      secret: environment().jwtSecret,
    });
    console.log(client);
    if (!user?.id) return client.disconnect();

    // Save connection
    this.cacheService.removeConnection(user.id, client);
  }

  @SubscribeMessage('hello')
  async helloSend() {}
}
