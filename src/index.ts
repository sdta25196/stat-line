#!/usr/bin/env node

import parse from 'yargs-parser'
import StatLine from './statLine'
import chalk from 'chalk'
import { log } from './utils'

const argv = parse(process.argv)

const userPath: string = argv._[2] || './'

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
