'use strict';

const { createContext, readScript } = require('metavm');
const { extname, basename, join } = require('path');
const { readdir } = require('fs').promises;

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
    return this.sections;
  }

  async loadFile(file) {
    const configFile = join(this.path, file);
    const sectionName = file.substring(0, file.indexOf('.'));
    const { exports } = await readScript(configFile, this.sandbox);
    this.sections[sectionName] = exports;
  }
}

module.exports = Config;
