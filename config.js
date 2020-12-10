'use strict';

const metavm = require('metavm');
const path = require('path');
const fsp = require('fs').promises;

class Config {
  constructor(dirPath, options = {}) {
    const { names, mode, sandbox } = options;
    this.sections = {};
    this.path = dirPath;
    this.names = names || null;
    this.mode = mode || '';
    this.sandbox = sandbox || metavm.createContext();
    return this.load();
  }

  async load() {
    const files = await fsp.readdir(this.path);
    const mode = '.' + this.mode;
    const sections = [];
    for (const file of files) {
      const fileExt = path.extname(file);
      if (fileExt !== '.js') continue;
      const fileName = path.basename(file, fileExt);
      const fileMode = path.extname(fileName);
      const sectionName = path.basename(fileName, fileMode);
      if (this.names && !this.names.includes(sectionName)) continue;
      if (!this.mode && fileName.includes('.')) continue;
      if (fileMode && fileMode !== mode) continue;
      const defaultName = `${fileName}${mode}.js`;
      if (!files.includes(defaultName)) sections.push(this.loadFile(file));
    }
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

const readConfig = (dirPath, options, names) =>
  new Config(dirPath, options, names);

module.exports = { Config, readConfig };
