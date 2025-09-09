'use strict';

const { test } = require('node:test');
const { strictEqual } = require('node:assert');
const vm = require('node:vm');
const metautil = require('metautil');
const { Config, readConfig } = require('../config.js');

test('Config class constructor', async () => {
  const config = await new Config('./examples/example1');
  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 80);
});

test('Config factory', async () => {
  const config = await readConfig('./examples/example1');
  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 80);
});

test('Server with logger', async () => {
  const context = { duration: metautil.duration };
  vm.createContext(context);
  const options = { context };
  const config = await new Config('./examples/example2', options);

  // Test server config
  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 80);

  // Test logger config
  strictEqual(config.logger.enabled, true);
  strictEqual(config.logger.keepDays, 100);
  strictEqual(config.logger.writeInterval, 3000);
  strictEqual(config.logger.writeBuffer, 65536);
  strictEqual(config.logger.toStdout.length, 3);
  strictEqual(config.logger.toStdout[0], 'system');
  strictEqual(config.logger.toStdout[1], 'fatal');
  strictEqual(config.logger.toStdout[2], 'error');
});

test('Application server', async () => {
  const context = { duration: metautil.duration };
  vm.createContext(context);
  const options = { context, mode: 'test' };
  const config = await new Config('./examples/example3', options);

  // Test application config
  strictEqual(config.application.name, 'Application name');

  // Test gateway config
  strictEqual(config.gateway.host, '10.0.0.1');
  strictEqual(config.gateway.port, 2000);

  // Test dependencies config
  strictEqual(config.dependencies.internal.length, 3);
  strictEqual(config.dependencies.internal[0], 'fs');
  strictEqual(config.dependencies.internal[1], 'path');
  strictEqual(config.dependencies.internal[2], 'http');
  strictEqual(config.dependencies.external.length, 3);
  strictEqual(config.dependencies.external[0], 'metautil');
  strictEqual(config.dependencies.external[1], 'metasync');
  strictEqual(config.dependencies.external[2], 'eslint');

  // Test server config
  strictEqual(config.server.transport, 'http');
  strictEqual(config.server.address, '127.0.0.1');
  strictEqual(config.server.ports, 8080);

  // Test timeouts config
  strictEqual(config.timeouts.cache, 30000);
  strictEqual(config.timeouts.relpy, 5000);
  strictEqual(config.timeouts.query, 3000);
});

test('Incorrect path error', async () => {
  try {
    const config = await new Config('./examples/example4');
    console.dir(config);
  } catch (error) {
    strictEqual(error.code, 'ENOENT');
  }
});

test('Specified sections', async () => {
  const options = { names: ['application', 'gateway'] };
  const config = await new Config('./examples/example3', options);
  strictEqual(config.application.name, 'Application name');
});

test('Specified sections with options', async () => {
  const options = { mode: 'test', names: ['application', 'gateway'] };
  const config = await new Config('./examples/example3', options);
  strictEqual(config.application.name, 'Application name');
  strictEqual(config.gateway.host, '10.0.0.1');
  strictEqual(config.gateway.port, 2000);
});

test('Compatibility with old signature', async () => {
  const context = { process };
  vm.createContext(context);
  const options = { context, mode: 'test' };
  const config = await new Config('./examples/example5', options);
  strictEqual(config.application.name, 'Application name');
  strictEqual(config.application.user, process.env.USER);
});
