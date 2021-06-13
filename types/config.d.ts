import * as vm from 'vm';

interface ConfigOptions {
  names?: Array<string>;
  mode?: string;
  context?: vm.Context;
  sandbox?: vm.Context;
}

export class Config<T = object> extends Promise<T> {
  constructor(dirPath: string, options?: ConfigOptions);
}

export function readConfig<T = object>(
  dirPath: string,
  options?: ConfigOptions
): Promise<T>;
