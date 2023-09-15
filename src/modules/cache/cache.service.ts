import { Injectable } from '@nestjs/common';
import { ConnectionManager } from './cache';
import { Socket } from 'socket.io';
import { BidirectionalMap } from 'src/utils/bidirection_map';

@Injectable()
export class CacheService {
  constructor() {}
  private data: BidirectionalMap<Socket> = new BidirectionalMap<Socket>(
    'userId',
    'clientId',
  );

  public addConnection(userId: string, client: Socket) {
    this.data.addData(userId, client.id, client);
  }

  public removeConnection(userId: string, client: Socket) {
    this.data.removeData(userId, client.id, client);
  }

  public getData(userId: string, clientId: string) {
    return this.data.value({
      userId,
      clientId,
    });
  }

  public getClientsByUserId(userId: string) {
    return this.data.values({
      userId,
    });
  }

  public getUsersByConnectionId(clientId: string) {
    return this.data.values({
      clientId,
    });
  }
}
