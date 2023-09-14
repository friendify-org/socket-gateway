import { Section } from './../../../node_modules/@cspotcode/source-map-support/node_modules/@jridgewell/trace-mapping/dist/types/types.d';
import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection
} from '@nestjs/websockets';
import { AuthGuard } from 'src/guard/auth';
import {Socket, Server} from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import environment from 'src/config/environment';

@WebSocketGateway(4000, { cors: '*' })
export class SocketGateway {

  constructor(private readonly jwtService: JwtService){}

  @WebSocketServer()
  server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    try{
      // Authorization when establish connection
      const authorizationHeader = client.handshake.headers["authorization"];
      if(!authorizationHeader) {
        return client.disconnect();
      }
      const accessToken = authorizationHeader.split(" ")[1]
      if(!accessToken) {
        return client.disconnect();
      }
      const user = this.jwtService.verify(accessToken, {
        secret: environment().jwtSecret
      })
      console.log("user is:", user)
      if(!user?.id) return client.disconnect()
    }catch(err){
      console.log(err)
      return client.disconnect();
    }
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage("hello")
  async helloSend(){
    
  }
}
