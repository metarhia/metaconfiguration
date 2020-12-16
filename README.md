# Metarhia Configuration Loader

[![CI Status](https://github.com/metarhia/config/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/config/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![NPM Version](https://badge.fury.io/js/%40metarhia%2Fconfig.svg)](https://badge.fury.io/js/%40metarhia%2Fconfig)
[![NPM Downloads/Month](https://img.shields.io/npm/dm/@metarhia/config.svg)](https://www.npmjs.com/package/@metarhia/config)
[![NPM Downloads](https://img.shields.io/npm/dt/@metarhia/config.svg)](https://www.npmjs.com/package/@metarhia/config)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/metarhia/config/blob/master/LICENSE)

## Installation

- `npm install @metarhia/config --save`
- `const { Config } = require('@metarhia/config');`

## Usage

Load configuration with asynchronous constructor:
```js
const { Config } = require('@metarhia/config');
const config = await new Config('./configDirectory');
console.log(config);
// Output example:
// {
//   logger: {
//     enabled: true,
//     keepDays: 100,
//     writeInterval: 3000,
//     writeBuffer: 65536,
//     toStdout: [ 'system', 'fatal', 'error' ]
//   },
//   server: {
//     transport: 'http',
//     address: '127.0.0.1',
//     ports: 80
//   }
// }
```
or factory:
```js
const { readConfig } = require('@metarhia/config');
const config = await readConfig('./configDirectory');
```
Specify certain configuration sections to load:
```js
const { Config } = require('@metarhia/config');
const options = { names: ['application', 'gateway'] };
const config = await new Config('./configDirectory', options);
```
Loag configuration in specified mode:
```js
const { Config } = require('@metarhia/config');
const options = { mode: 'test' };
const config = await new Config('./configDirectory', options);
```
Specify sections and mode:
```js
const { Config } = require('@metarhia/config');
const options = { mode: 'test', names: ['application', 'gateway'] };
const config = await new Config('./configDirectory', options);
```
Use custom context (sandbox) to execute configuration js file in it:
```js
const vm = require('vm');
const common = require('@metarhia/common');
const { Config } = require('@metarhia/config');
const sandbox = { Duration: common.duration };
vm.createContext(sandbox);
const options = { sandbox };
const config = await new Config('./configDirectory', options);
```
