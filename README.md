# Metarhia Configuration Loader

[![CI Status](https://github.com/metarhia/config/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/config/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![NPM Version](https://badge.fury.io/js/%40metarhia%2Fconfig.svg)](https://badge.fury.io/js/%40metarhia%2Fconfig)
[![NPM Downloads/Month](https://img.shields.io/npm/dm/@metarhia/config.svg)](https://www.npmjs.com/package/@metarhia/config)
[![NPM Downloads](https://img.shields.io/npm/dt/@metarhia/config.svg)](https://www.npmjs.com/package/@metarhia/config)

## Installation

```bash
$ npm install @metarhia/config
```

## Usage

Load configuration with asynchronous constructor:
```js
const { Config } = require('..');
const config = await new Config('./pathToConfigDirectory');
```
or factory:
```js
const { readConfig } = require('..');
const config = await readConfig('./pathToConfigDirectory');
```
Specify certain config sections:
```js
const { readConfig } = require('..');
const names = ['application', 'gateway'];
const config = await new Config('./examples/example3', names);
```
