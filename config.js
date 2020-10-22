'use strict';

const metavm = require('metavm');
const path = require('path');
const fs = require('fs').promises;

class Config {
  constructor(dirPath, options, names = null) {
    if (Array.isArray(options)) {
      names = options;
      options = null;
    }
    if (!options) options = {};
    this.names = names;
    this.sections = {};
    this.path = dirPath;
    this.mode = options.mode || '';
    this.sandbox = options.sandbox || metavm.createContext();
    return this.load();
  }

  async load() {
    const files = await fs.readdir(this.path);
    const mode = '.' + this.mode;
    const sections = files
      .filter(file => {
        const fileExt = path.extname(file);
        if (fileExt !== '.js') return false;
        const fileName = path.basename(file, fileExt);
        const fileMode = path.extname(fileName);
        const sectionName = path.basename(fileName, fileMode);
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
    const configFile = path.join(this.path, file);
    const sectionName = file.substring(0, file.indexOf('.'));
    const options = { context: this.sandbox };
    const { exports } = await metavm.readScript(configFile, options);
    this.sections[sectionName] = exports;
  }
}

module.exports = Config;
