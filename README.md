# Metarhia Configuration Loader

[![ci status](https://github.com/metarhia/metaconfiguration/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/metaconfiguration/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![snyk](https://snyk.io/test/github/metarhia/metaconfiguration/badge.svg)](https://snyk.io/test/github/metarhia/metaconfiguration)
[![npm version](https://badge.fury.io/js/metaconfiguration.svg)](https://badge.fury.io/js/metaconfiguration)
[![npm downloads/month](https://img.shields.io/npm/dm/metaconfiguration.svg)](https://www.npmjs.com/package/metaconfiguration)
[![npm downloads](https://img.shields.io/npm/dt/metaconfiguration.svg)](https://www.npmjs.com/package/metaconfiguration)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/metarhia/metaconfiguration/blob/master/LICENSE)

## Installation

- `npm install metaconfiguration --save`
- `const { Config } = require('metaconfiguration');`

## Usage

Load configuration with factory method:

```js
const { Config } = require('metaconfiguration');
const config = await Config.create('./configDirectory');
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

Specify certain configuration sections to load:

```js
const { Config } = require('metaconfiguration');
const options = { names: ['application', 'gateway'] };
const config = await Config.create('./configDirectory', options);
```

Load configuration in specified mode:

```js
const { Config } = require('metaconfiguration');
const options = { mode: 'test' };
const config = await Config.create('./configDirectory', options);
```

Specify sections and mode:

```js
const { Config } = require('metaconfiguration');
const options = { mode: 'test', names: ['application', 'gateway'] };
const config = await Config.create('./configDirectory', options);
```

Use custom context (sandbox) to execute configuration js file in it:

```js
const vm = require('node:vm');
const metautil = require('metautil');
const { Config } = require('metaconfiguration');
const context = { duration: metautil.duration };
vm.createContext(context);
const options = { context };
const config = await Config.create('./configDirectory', options);
```

## License & Contributors

Copyright (c) 2019-2025 [Metarhia contributors](https://github.com/metarhia/metaconfiguration/blob/master/AUTHORS).
Metaconfiguration is [MIT licensed](./LICENSE).\
Metaconfiguration is a part of [Metarhia](https://github.com/metarhia) technology stack.
