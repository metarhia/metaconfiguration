import * as vm from 'node:vm';

export interface ConfigOptions {
  names?: Array<string>;
  mode?: string;
  context?: vm.Context;
}

export class Config {
  static create<T extends Record<string, unknown> = Record<string, unknown>>(
    dirPath: string,
    options?: ConfigOptions,
  ): Promise<T>;
}
