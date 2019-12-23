'use strict';

const vm = require('vm');
const common = require('@metarhia/common');
const Config = require('./config.js');

(async () => {
  const config = await new Config('./examples/example1');
  console.dir({ config }, { depth: null });
})();

(async () => {
  const sandbox = { Duration: common.duration };
  vm.createContext(sandbox);
  const config = await new Config('./examples/example2', { sandbox });
  console.dir({ config }, { depth: null });
})();

(async () => {
  const sandbox = { Duration: common.duration };
  vm.createContext(sandbox);
  const options = { sandbox, mode: 'test' };
  const config = await new Config('./examples/example3', options);
  console.dir({ config }, { depth: null });
})();
