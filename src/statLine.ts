import path from 'path'
import fs from 'fs'
import ProgressBar from 'progress'
import chalk from 'chalk'
import { log } from './utils'

class StatLine {
  fileType: string[]
  workPath: string
  fileStatInfo: Record<string, number> = { }
  constructor(userPath: string, fileType: string[]) {
    this.fileType = this.addDot(fileType)
    this.workPath = path.resolve(process.cwd(), userPath)
  }

  run(): void {
    this.branchCondition(this.workPath)
    this.complete()
  }

  addDot(fileType: string[]): string[] {
    fileType.forEach((item, i, arr) => {
      if (!item.startsWith(".")) {
        arr[i] = `.${item}`
      }
    })
    return fileType
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

  /** 分支条件处理 */
  branchCondition(filePath: string) {
    if (fs.lstatSync(filePath).isDirectory()) {
      this.statLines(filePath)
    } else {
      this.updateFileStatInfo(filePath)
    }
  }

  updateFileStatInfo(filePath: string): void {
    this.fileType.forEach(item => {
      if (path.extname(filePath) === item) {
        let content = fs.readFileSync(filePath, 'utf8')
        this.fileStatInfo[filePath] = content.split('\n').length
      }
    })
  }

  complete(): void {
    const keys = Object.keys(this.fileStatInfo)
    if (keys.length) {
      const allStat: Record<string, number> = { }
      const sumStat: Record<string, number> = { }
      for (let k in this.fileStatInfo) {
        this.fileType.forEach(item => {
          if (new RegExp(`${item}$`).test(k)) {
            if (!allStat[item] || !sumStat[item]) {
              allStat[item] = 0
              sumStat[item] = 0
            }
            // stat line 统计行
            allStat[item] += this.fileStatInfo[k]
            // stat sum 统计文件数
            sumStat[item]++
          }
        })
      }
      log(JSON.stringify(this.fileStatInfo, null, 4))
      for (let k in allStat) {
        log(`${k}类型文件,总计${sumStat[k]}个,共${allStat[k]}行`)
      }
    } else {
      log(chalk.red(`未统计到${this.fileType}类型文件`))
    }
  }
}

export default StatLine
