#!/usr/bin/env node

import parse from 'yargs-parser'
import Command, { CommandType } from './command'

const argv = parse(process.argv, {
  alias: { 'type': ['t'], 'help': ['h'] },
  default: { 'type': '.js' },
  array: ['type'],
  configuration: {
    'greedy-arrays': true
  }
})

let commandObj: CommandType = {
  path: argv._[2] || './',
  type: argv.type,
  help: argv.help || false,
  recursion: argv.r || false
}

const cmd = new Command(commandObj)
cmd.start()
