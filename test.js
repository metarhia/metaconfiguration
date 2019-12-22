'use strict';

const vm = require('vm');
const Config = require('./config.js');

(async () => {
  const sandbox = { Duration: x => x };
  vm.createContext(sandbox);
  const config = new Config('./example', { sandbox });
  await config.load();
  console.dir({ config }, { depth: null });
})();
