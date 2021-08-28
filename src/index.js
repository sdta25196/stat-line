#!/usr/bin/env node

const parse = require('yargs-parser')
const StatLine = require('./statLine')
const chalk = require('chalk')
const { log } = require('./utils')

const argv = parse(process.argv)

const userPath = argv._[2] || './'

if (argv.help) {
  const content = require('fs').readFileSync(require('path').resolve(__dirname, '../static/help.txt'), 'utf-8')
  log(content)
} else {
  const sl = new StatLine(userPath, argv.type)
  try {
    sl.run()
  } catch (error) {
    log(chalk.red(error.message))
  }
}
