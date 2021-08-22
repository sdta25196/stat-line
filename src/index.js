#!/usr/bin/env node

const parse = require('yargs-parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const statLines = require('./util')

const argv = parse(process.argv)

const userPath = argv._[2] || './'
if (!userPath) {
  console.log(chalk.red("输入要统计的文件路径"));
  process.exit(-1)
}

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
const keys = Object.keys(fileStat)
if (keys.length) {
  console.log(fileStat)
  let sum = 0
  keys.forEach(e => {
    sum += fileStat[e]
  })
  console.log(`总计${keys.length}个文件,${sum}行`)
} else {
  console.log(`未统计到${fileType}类型文件`)
}


