const fs = require('fs')
const path = require('path')
const appRootDir = require('app-root-dir').get()

// create a new config based off of the modified, with fallbacks if properties are not modified.
function SolitConfig (modified={}) {
  this.dev = modified.dev // this will always be set at runtime, even by solit.js
  this.rootDir = modified.rootDir || appRootDir,
  this.srcDir = modified.srcDir ? path.resolve(this.rootDir, modified.srcDir) : path.resolve(this.rootDir, 'src', 'server'),
  this.buildDir = modified.buildDir || 'dist/server'
  this.buildFilename = modified.buildFilename || 'server.js'
  this.host = modified.host || '127.0.0.1',
  this.port = modified.port || 3000,
  this.startMessage = ``
  this.env = modified.env
}

module.exports = SolitConfig