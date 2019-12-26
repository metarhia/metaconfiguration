'use strict';

const { createContext, Script } = require('vm');
const { extname, basename, join } = require('path');
const { readdir, readFile } = require('fs').promises;

const USE_STRICT = `'use strict';\n`;
const SCRIPT_TIMEOUT = 5000;

class Config {
  constructor(dir, options = {}) {
    const { mode = '', sandbox = null, priority = null } = options;
    this.sections = {};
    this.dir = dir;
    this.mode = mode;
    this.sandbox = sandbox || createContext({});
    this.priority = priority;
    return this.load();
  }

  async load() {
    const files = await readdir(this.dir);
    const mode = '.' + this.mode;
    const sections = files
      .filter(file => {
        const fileExt = extname(file);
        if (fileExt !== '.js') return false;
        const fileName = basename(file, fileExt);
        if (!this.mode) return !fileName.includes('.');
        const fileMode = extname(fileName);
        if (fileMode) return fileMode === mode;
        const defaultName = `${fileName}${mode}.js`;
        return !files.includes(defaultName);
      })
      .map(file => this.loadFile(file));
    await Promise.all(sections);
    return this;
  }

  async loadFile(file) {
    const configFile = join(this.dir, file);
    const sectionName = file.substring(0, file.indexOf('.'));
    const exports = await this.createScript(configFile);
    this.sections[sectionName] = exports;
  }

  async createScript(fileName) {
    const src = await readFile(fileName);
    const scriptOptions = {
      filename: fileName,
      lineOffset: -2, // to compensate USE_STRICT wrapper
    };
    const code = USE_STRICT + src;
    const script = new Script(code, scriptOptions);
    const runOptions = {
      displayErrors: false,
      timeout: SCRIPT_TIMEOUT, // msec
    };
    return script.runInContext(this.sandbox, runOptions);
  }
}

module.exports = Config;
