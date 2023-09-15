import { Socket } from 'socket.io';

export type ConnectionInformation = Socket;

export type Connection = {
  [userId: string]: ConnectionInformation;
};

export type ConnectionManager = {
  [connectionId: string]: Connection;
};

export type UserConnect = {
  [connectionId: string]: ConnectionInformation;
};

export type UserConnectManager = {
  [userId: string]: ConnectionInformation;
};
