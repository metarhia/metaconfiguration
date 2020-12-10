'use strict';

const vm = require('vm');
const common = require('@metarhia/common');
const { Config, readConfig } = require('..');
const metatests = require('metatests');

metatests.test('Config class constructor', async test => {
  const sections = {
    server: { transport: 'http', address: '127.0.0.1', ports: 80 },
  };
  const config = await new Config('./examples/example1');
  test.strictSame(config, sections);
  test.end();
});

metatests.test('Config factory', async test => {
  const sections = {
    server: { transport: 'http', address: '127.0.0.1', ports: 80 },
  };
  const config = await readConfig('./examples/example1');
  test.strictSame(config, sections);
  test.end();
});

metatests.test('Server with logger', async test => {
  const sections = {
    server: { transport: 'http', address: '127.0.0.1', ports: 80 },
    logger: {
      enabled: true,
      keepDays: 100,
      writeInterval: 3000,
      writeBuffer: 65536,
      toStdout: ['system', 'fatal', 'error'],
    },
  };
  const sandbox = { Duration: common.duration };
  vm.createContext(sandbox);
  const options = { sandbox };
  const config = await new Config('./examples/example2', options);
  test.strictSame(config, sections);
  test.end();
});

metatests.test('Application server', async test => {
  const sandbox = { Duration: common.duration };
  const sections = {
    application: { name: 'Application name' },
    gateway: { host: '10.0.0.1', port: 2000 },
    dependencies: {
      internal: ['fs', 'path', 'http'],
      external: ['@metarhia/common', 'metasync', 'eslint'],
    },
    server: { transport: 'http', address: '127.0.0.1', ports: 8080 },
    timeouts: { cache: 30000, relpy: 5000, query: 3000 },
  };
  vm.createContext(sandbox);
  const options = { sandbox, mode: 'test' };
  const config = await new Config('./examples/example3', options);
  test.strictSame(config, sections);
  test.end();
});

metatests.test('Incorrect path error', async test => {
  try {
    const config = await new Config('./examples/example4');
    console.dir(config);
  } catch (error) {
    test.strictSame(error.code, 'ENOENT');
  }

  test.end();
});

metatests.test('Specified sections', async test => {
  const sections = {
    application: { name: 'Application name' },
  };
  const options = { names: ['application', 'gateway'] };
  const config = await new Config('./examples/example3', options);
  test.strictSame(config, sections);
  test.end();
});

metatests.test('Specified sections with options', async test => {
  const sections = {
    application: { name: 'Application name' },
    gateway: { host: '10.0.0.1', port: 2000 },
  };
  const options = { mode: 'test', names: ['application', 'gateway'] };
  const config = await new Config('./examples/example3', options);
  test.strictSame(config, sections);
  test.end();
});
