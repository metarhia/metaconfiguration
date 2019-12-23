'use strict';

const vm = require('vm');
const path = require('path');
const fs = require('fs').promises;
const common = require('@metarhia/common');

const USE_STRICT = `'use strict';\n`;
const SCRIPT_TIMEOUT = 5000;

class Config {
  constructor(dir, options = {}) {
    const { mode = '', sandbox = null, priority = null } = options;
    this.sections = {};
    this.dir = dir;
    this.mode = mode;
    this.sandbox = sandbox || vm.createContext({});
    this.priority = priority;
    return this.load();
  }

  async load() {
    const files = await fs.readdir(this.dir);
    if (this.priority) {
      files.sort((s1, s2) => common.sortComparePriority(this.priority, s1, s2));
    }
    const sections = files
      .filter(file => {
        const fileExt = path.extname(file);
        const fileName = path.basename(file, fileExt);
        if (!this.mode) return !fileName.includes('.');
        const modeName = path.extname(fileName);
        const fName = `${fileName}.${this.mode}${fileExt}`;
        const noMode = modeName === '' || modeName === '.' + this.mode;
        return !files.includes(fName) && noMode;
      })
      .map(file => this.loadFile(file));
    await Promise.all(sections);
    return this;
  }

  async loadFile(file) {
    const configFile = path.join(this.dir, file);
    const fileExt = path.extname(file);
    const fileName = path.basename(file, fileExt);
    const sectionName = this.mode
      ? path.basename(fileName, '.' + this.mode)
      : fileName;
    if (fileExt !== '.js' || this.sections[sectionName]) return;
    const exports = await this.createScript(configFile);
    this.sections[sectionName] = exports;
  }

  async createScript(fileName) {
    const src = await fs.readFile(fileName);
    const scriptOptions = {
      filename: fileName,
      lineOffset: -2, // to compensate USE_STRICT wrapper
    };
    const code = USE_STRICT + src;
    const script = new vm.Script(code, scriptOptions);
    const runOptions = {
      displayErrors: false,
      timeout: SCRIPT_TIMEOUT, // msec
    };
    const exports = script.runInContext(this.sandbox, runOptions);
    if (Object.prototype.toString.call(exports) === '[object Error]') {
      throw new Error(`Can not create script ${fileName}`);
    }
    return exports;
  }
}

module.exports = Config;
