import { RmqOptions, Deserializer } from '@nestjs/microservices';

export type RmqRequestOption = RmqOptions['options'];

export class AppDeserializer implements Deserializer {
  deserialize(value: any, options?: RmqRequestOption) {
    if (!options?.headers?.message) {
      return {
        pattern: undefined,
        data: undefined,
      };
    }
    return {
      pattern: options.headers.message,
      data: value,
    };
  }
}
