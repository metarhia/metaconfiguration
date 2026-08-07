'use strict';

const path = require('node:path');
const fsp = require('node:fs/promises');

const { createContext, readScript } = require('metavm');

class Config {
  #path = '';
  #names = new Set();
  #mode = '';
  #context = null;
  #sections = {};

  constructor(dirPath, options = {}) {
    const { names, mode, context } = options;
    this.#path = dirPath;
    if (names) this.#names = new Set(names);
    if (mode) this.#mode = mode;
    this.#context = context ?? createContext();
    return this.#load();
  }

  static async create(dirPath, options) {
    return new Config(dirPath, options);
  }

  async #load() {
    const files = await fsp.readdir(this.#path);
    const fileSet = new Set(files);
    const mode = `.${this.#mode}`;
    const names = this.#names;
    const pending = [];
    for (const file of files) {
      const fileExt = path.extname(file);
      if (fileExt !== '.js') continue;
      const fileName = path.basename(file, fileExt);
      const fileMode = path.extname(fileName);
      const sectionName = path.basename(fileName, fileMode);
      if (names.size > 0 && !names.has(sectionName)) continue;
      if (!this.#mode && fileName.includes('.')) continue;
      if (fileMode && fileMode !== mode) continue;
      const modeFileName = `${fileName}${mode}.js`;
      if (fileSet.has(modeFileName)) continue;
      pending.push(this.#loadFile(file));
    }
    await Promise.all(pending);
    return this.#sections;
  }

  async #loadFile(file) {
    const configFile = path.join(this.#path, file);
    const dotIndex = file.indexOf('.');
    const sectionName = file.substring(0, dotIndex);
    const options = { context: this.#context };
    const { exports } = await readScript(configFile, options);
    this.#sections[sectionName] = exports;
  }
}

module.exports = { Config };
