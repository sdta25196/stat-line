#!/usr/bin/env node

const parse = require('yargs-parser')
const StatLine = require('./statLine')
const chalk = require('chalk')

const argv = parse(process.argv)

const userPath = argv._[2] || './'
const sl = new StatLine(userPath, argv.type)
try {
  sl.run()
} catch (error) {
  sl.log(chalk.red(error.message))
}
