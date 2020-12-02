/**
 * Adapted from https://github.com/typicode/lowdb/blob/master/src/adapters/FileSync.js
 * Modified to work on read-only deployments (i.e. on Vercel)
 * 
 * Faheem Quazi
 */

const fs = require('graceful-fs');
const Base = require('lowdb/adapters/Base');

const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

// Same code as in FileAsync, minus `await`
class FileSync extends Base {
  constructor(...args) {
    super(...args);
    this.localdata = {};
  }
  read() {
    // fs.exists is deprecated but not fs.existsSync
    if (fs.existsSync(this.source)) {
      // Read database
      try {
        const FileData = readFile(this.source, 'utf-8').trim();
        var data = Object.assign({}, FileData ? this.deserialize(FileData) : this.defaultValue, this.localdata);
        return data;
      } catch (e) {
        if (e instanceof SyntaxError) {
          e.message = `Malformed JSON in file: ${this.source}\n${e.message}`;
        }
        throw e;
      }
    } else {
      // Initialize
      try {  
        writeFile(this.source, this.serialize(this.defaultValue));
      } catch (error) {
          console.log("DB Write Error: Data may not be saved if the server shuts down.");
      }
      this.localdata = this.defaultValue;
      return this.defaultValue;
    }
  }

  write(data) {
    this.localdata = data;
    try {
        writeFile(this.source, this.serialize(data));
    } catch (error) {
        console.log("DB Write Error: Data may not be saved if the server shuts down.");
    }
    return undefined;
  }
}

module.exports = FileSync