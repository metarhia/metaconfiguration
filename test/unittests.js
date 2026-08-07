'use strict';

const { test } = require('node:test');
const { strictEqual, rejects, deepStrictEqual } = require('node:assert');
const vm = require('node:vm');

const metautil = require('metautil');
const { Config } = require('../config.js');

const createDurationContext = () => {
  const context = { duration: metautil.duration };
  vm.createContext(context);
  return context;
};

test('Config basic loading', async () => {
  const config = await Config.create('./examples/example1');
  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 80);
});

test('Config factory method', async () => {
  const config = await Config.create('./examples/example1');
  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 80);
});

test('Server with logger', async () => {
  const context = createDurationContext();
  const options = { context };
  const config = await Config.create('./examples/example2', options);

  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 80);

  strictEqual(config.logger.enabled, true);
  strictEqual(config.logger.keepDays, 100);
  strictEqual(config.logger.writeInterval, 3000);
  strictEqual(config.logger.writeBuffer, 65536);
  const { toStdout } = config.logger;
  strictEqual(toStdout.length, 3);
  strictEqual(toStdout[0], 'system');
  strictEqual(toStdout[1], 'fatal');
  strictEqual(toStdout[2], 'error');
});

test('Application server with test mode', async () => {
  const context = createDurationContext();
  const options = { context, mode: 'test' };
  const config = await Config.create('./examples/example3', options);

  strictEqual(config.application.name, 'Application name');

  strictEqual(config.gateway.host, '10.0.0.1');
  strictEqual(config.gateway.port, 2000);

  const { internal, external } = config.dependencies;
  strictEqual(internal.length, 3);
  strictEqual(internal[0], 'fs');
  strictEqual(internal[1], 'path');
  strictEqual(internal[2], 'http');
  strictEqual(external.length, 3);
  strictEqual(external[0], 'metautil');
  strictEqual(external[1], 'metasync');
  strictEqual(external[2], 'eslint');

  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 8080);

  strictEqual(config.timeouts.cache, 30000);
  strictEqual(config.timeouts.reply, 5000);
  strictEqual(config.timeouts.query, 3000);
});

test('Application server with debug mode', async () => {
  const context = createDurationContext();
  const options = { context, mode: 'debug' };
  const config = await Config.create('./examples/example3', options);

  strictEqual(config.application.name, 'Application name: Debug mode');

  const { internal } = config.dependencies;
  strictEqual(internal.length, 5);
  strictEqual(internal[3], 'v8');
  strictEqual(internal[4], 'timers');

  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 80);
});

test('Incorrect path error', async () => {
  await rejects(Config.create('./examples/example4'), { code: 'ENOENT' });
});

test('Specified sections filters correctly', async () => {
  const options = { names: ['application', 'gateway'] };
  const config = await Config.create('./examples/example3', options);
  strictEqual(config.application.name, 'Application name');
  strictEqual(config.server, undefined);
  strictEqual(config.dependencies, undefined);
  strictEqual(config.timeouts, undefined);
});

test('Specified sections with mode', async () => {
  const options = { mode: 'test', names: ['application', 'gateway'] };
  const config = await Config.create('./examples/example3', options);
  strictEqual(config.application.name, 'Application name');
  strictEqual(config.gateway.host, '10.0.0.1');
  strictEqual(config.gateway.port, 2000);
  strictEqual(config.server, undefined);
  strictEqual(config.dependencies, undefined);
});

test('Compatibility with old signature', async () => {
  const context = { process };
  vm.createContext(context);
  const options = { context, mode: 'test' };
  const config = await Config.create('./examples/example5', options);
  strictEqual(config.application.name, 'Application name');
  strictEqual(config.application.user, process.env.USER);
});

test('Empty config directory', async () => {
  const config = await Config.create('./examples/example6');
  deepStrictEqual(config, {});
});
