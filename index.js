const { SolitConfig, ServerConfig, dev } = require('./config')
const { spawn } = require('child_process')
const fs = require('fs')
const MFS = require('memory-fs')
const path = require('path')
const appRootDir = require('app-root-dir').get()
const webpack = require('webpack')

class Solit {
  // customConfig is only used when someone wants to use solit as a module (rarely)
  constructor (customConfig) {
    this.config = customConfig || this.getModifiedSolitConfig()
  }
  getModifiedSolitConfig () {
    let solitConfigDir = path.resolve(appRootDir, 'solit.config.js')
    let exists = fs.existsSync(solitConfigDir)
    return exists ? require(solitConfigDir) : {}
  }
  executionPath () {
    let solitConfig = new SolitConfig(this.config)
    return path.resolve(appRootDir, solitConfig.buildDir, 'server.js')
  }
  getServerCompiler (config) {
    let solitConfig = new SolitConfig(config)
    let serverConfig = ServerConfig(solitConfig)
    let serverCompiler = webpack(serverConfig)
    return serverCompiler
  }
  dev () {
    this.config.dev = true
    let serverCompiler = this.getServerCompiler(this.config)
    serverCompiler.outputFileSystem = new MFS()
    serverCompiler.watch({ quiet: true, stats: 'none' }, stats => {})
  }
  build () {
    this.config.dev = false
    let serverCompiler = this.getServerCompiler(this.config)
    serverCompiler.run((error, stats) => {
      if (error) console.error(error)
      console.log('Build complete!')
    })
  }
  start () {
    this.config.dev = false
    if (fs.existsSync(this.executionPath())) {
      spawn('node', [this.executionPath()], { shell: true, stdio: 'inherit' })
    } else {
      throw Error('The file doesn\'t exist. Run solit build.')
    }
  }
}

module.exports = Solit
