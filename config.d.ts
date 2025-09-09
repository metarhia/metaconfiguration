import * as vm from 'node:vm';

interface ConfigOptions {
  names?: Array<string>;
  mode?: string;
  context?: vm.Context;
}

export class Config {
  #path: string;
  #names: Array<string>;
  #mode: string;
  #context: vm.Context;
  #sections: object;
  constructor(dirPath: string, options?: ConfigOptions);
  static create(dirPath: string, options?: ConfigOptions): Promise<Config>;
  #load(): Promise<object>;
  #loadFile(file: string): Promise<void>;
}
