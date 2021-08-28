const path = require('path')
const fs = require('fs')
const ProgressBar = require('progress')
const chalk = require('chalk')
const { log } = require('./utils')

class StatLine {
  fileType
  workPath
  fileStat = { }
  constructor(userPath, fileType = '.js') {
    if (!fileType.startsWith(".")) {
      fileType = `.${fileType}`
    }
    this.fileType = fileType
    this.workPath = path.resolve(process.cwd(), userPath)
  }

  run() {
    if (fs.lstatSync(this.workPath).isDirectory()) {
      this.statLines(this.workPath)
    } else {
      this.updateFileStat(this.workPath)
    }
    this.complete()
  }

  statLines(workPath) {
    const files = fs.readdirSync(workPath)
    const bar = new ProgressBar(`:bar :current / :total`, { total: files.length, clear: true });
    files.forEach(file => {
      const filePath = path.resolve(`${workPath}/${file}`)
      if (fs.lstatSync(filePath).isDirectory()) {
        this.statLines(filePath)
      } else {
        this.updateFileStat(filePath)
      }
      bar.tick();
    })
  }

  updateFileStat(filePath) {
    if (path.extname(filePath) === this.fileType) {
      let content = fs.readFileSync(filePath, 'utf8')
      this.fileStat[filePath] = content.split('\n').length
    }
  }

  complete() {
    const keys = Object.keys(this.fileStat)
    if (keys.length) {
      let sum = 0
      keys.forEach(e => sum += this.fileStat[e])
      log(this.fileStat)
      log(`总计${keys.length}个文件,${sum}行`)
    } else {
      log(chalk.red(`未统计到${this.fileType}类型文件`))
    }
  }
}

module.exports = StatLine
