import * as vm from 'node:vm';

interface ConfigOptions {
  names?: Array<string>;
  mode?: string;
  context?: vm.Context;
  sandbox?: vm.Context;
}

export class Config {
  sections: object;
  path: string;
  names: Array<string>;
  mode: string;
  context: vm.Context;
  constructor(dirPath: string, options?: ConfigOptions);
  load(): Promise<object>;
  loadFile(file: string): Promise<void>;
}

export function readConfig(
  dirPath: string,
  options?: ConfigOptions,
): Promise<Config>;
