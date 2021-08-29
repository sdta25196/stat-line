import path from 'path'
import fs from 'fs'
import ProgressBar from 'progress'
import chalk from 'chalk'
import { log } from './utils'

class StatLine {
  fileType: string
  workPath: string
  fileStat: Record<string, number> = { }
  constructor(userPath: string, fileType: string = '.js') {
    if (!fileType.startsWith(".")) {
      fileType = `.${fileType}`
    }
    this.fileType = fileType
    this.workPath = path.resolve(process.cwd(), userPath)
  }

  run(): void {
    this.branchCondition(this.workPath)
    this.complete()
  }

  statLines(workPath: string): void {
    const files = fs.readdirSync(workPath)
    const bar = new ProgressBar(`:bar :current / :total`, { total: files.length, clear: true });
    files.forEach(file => {
      const filePath = path.resolve(`${workPath}/${file}`)
      this.branchCondition(filePath)
      bar.tick();
    })
  }

  branchCondition(filePath: string) {
    if (fs.lstatSync(filePath).isDirectory()) {
      this.statLines(filePath)
    } else {
      this.updateFileStat(filePath)
    }
  }

  updateFileStat(filePath: string): void {
    if (path.extname(filePath) === this.fileType) {
      let content = fs.readFileSync(filePath, 'utf8')
      this.fileStat[filePath] = content.split('\n').length
    }
  }

  complete(): void {
    const keys = Object.keys(this.fileStat)
    if (keys.length) {
      let sum = 0
      keys.forEach(e => sum += this.fileStat[e])
      log(JSON.stringify(this.fileStat, null, 4))
      log(`总计${keys.length}个文件,${sum}行`)
    } else {
      log(chalk.red(`未统计到${this.fileType}类型文件`))
    }
  }
}

export default StatLine
