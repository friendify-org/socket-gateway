export type BidirectionalData<T extends any> = {
  [key: string]: {
    [key: string]: T;
  };
};

export type BidirectionalQuery = {
  [key: string]: string;
};

export class BidirectionalMap<T extends any> {
  private data: BidirectionalData<T> = {};
  private rData: BidirectionalData<T> = {};

  constructor(
    private key1: string,
    private key2: string,
  ) {}

  // Return exact data by key1 key2
  public value(query: BidirectionalQuery): T | undefined {
    try {
      return this.data[query[this.key2]][query[this.key2]];
    } catch (_) {
      return undefined;
    }
  }

  public values(query: BidirectionalQuery): { [key: string]: T } {
    if (query[this.key1]) return this.data[query[this.key1]];
    return this.rData[query[this.key2]];
  }

  public addData(key1: string, key2: string, data: T) {
    this.data[key1][key2] = data;
    this.rData[key2][key1] = data;
  }

  public removeData(key1: string, key2: string, data: T) {
    delete this.data[key1][key2];
    delete this.rData[key2][key1];
  }

  public toMap(data: { [key: string]: T }): Array<T> {
    return Object.keys(data).map((key) => data[key]);
  }
}
