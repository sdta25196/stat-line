#!/usr/bin/env node

import parse from 'yargs-parser'
import Command, { CommandType } from './command'

const argv = parse(process.argv, {
  alias: { 'type': ['t'], 'help': ['h'], 'exclude': ['e'] },
  default: { 'type': '.js' },
  array: ['type', 'exclude'],
  configuration: {
    'greedy-arrays': true
  }
})

let commandObj: CommandType = {
  path: argv._[2] || './',
  type: argv.type,
  help: argv.help || false,
  recursion: argv.r || false,
  exclude: argv.exclude || []
}

const cmd = new Command(commandObj)
cmd.start()
