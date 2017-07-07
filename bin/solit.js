#! /usr/bin/env node

const defaultCommand = 'dev'
const Solit = require('../index')

const solit = new Solit() 

const commands = new Set([ defaultCommand, 'build', 'start' ])

let cmd = process.argv[2]

if (commands.has(cmd)) process.argv.splice(2, 1)
else cmd = defaultCommand

if (cmd === defaultCommand) solit.dev()
else if (cmd === 'build') solit.build()
else if (cmd === 'start') solit.start()
