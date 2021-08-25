#!/usr/bin/env node

const parse = require('yargs-parser')
const path = require('path')
const fs = require('fs')
const statLines = require('./statLines')
const complete = require('./complete')

const argv = parse(process.argv)

const userPath = argv._[2] || './'

if (argv.type) {
  if (!argv.type.startsWith(".")) {
    argv.type = `.${argv.type}`
  }
}
const workPath = path.resolve(process.cwd(), userPath)
const fileType = argv.type || '.js'
let fileStat = {}

if (!fs.lstatSync(workPath).isDirectory()) {
  let data = fs.readFileSync(workPath, 'utf8')
  fileLine = data.split('\r\n').length
  fileStat[path.resolve(workPath)] = fileLine
} else {
  statLines(workPath, fileType, fileStat)
}

complete(fileStat)

