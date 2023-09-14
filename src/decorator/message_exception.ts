import { Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export type MessageHandlerError = ValidationError | Error;

export const MessageException = (): MethodDecorator => {
  return (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const method: Function = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        await method.call(this, ...args);
      } catch (err: any | Array<any>) {
        if (Array.isArray(err)) {
          Logger.error(err.map((err) => err.toString()).join(', '), key);
          return;
        }
        Logger.error(err.message, key);
      }
    };
    return descriptor;
  };
};
