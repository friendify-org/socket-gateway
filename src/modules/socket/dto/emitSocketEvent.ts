import { IsObject, IsString } from 'class-validator';

export class EmitSocketEvent {
  @IsString()
  userId: string;

  @IsObject()
  payload: Object;

  constructor(data: EmitSocketEvent) {
    Object.assign(this, data)
  }
}
