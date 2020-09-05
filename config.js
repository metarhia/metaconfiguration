'use strict';

const { createContext, Script } = require('vm');
const { extname, basename, join } = require('path');
const { readdir, readFile } = require('fs').promises;

const USE_STRICT = `'use strict';\n`;
const SCRIPT_TIMEOUT = 5000;

class Config {
  constructor(path, options, names = null) {
    if (Array.isArray(options)) {
      names = options;
      options = null;
    }
    if (!options) options = {};
    this.names = names;
    this.sections = {};
    this.path = path;
    this.mode = options.mode || '';
    this.sandbox = options.sandbox || createContext({});
    return this.load();
  }

  async load() {
    const files = await readdir(this.path);
    const mode = '.' + this.mode;
    const sections = files
      .filter(file => {
        const fileExt = extname(file);
        if (fileExt !== '.js') return false;
        const fileName = basename(file, fileExt);
        const fileMode = extname(fileName);
        const sectionName = basename(fileName, fileMode);
        if (this.names && !this.names.includes(sectionName)) return false;
        if (!this.mode) return !fileName.includes('.');
        if (fileMode) return fileMode === mode;
        const defaultName = `${fileName}${mode}.js`;
        return !files.includes(defaultName);
      })
      .map(file => this.loadFile(file));
    await Promise.all(sections);
    return this;
  }

  async loadFile(file) {
    const configFile = join(this.path, file);
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
