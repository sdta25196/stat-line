import path from 'path'
import fs from 'fs'
import ProgressBar from 'progress'
import chalk from 'chalk'
import { log } from './utils'
import { CommandType } from './command'

class StatLine {
  fileType: string[]
  workPath: string
  recursion: boolean
  exclude: string[]
  fileStatInfo: Record<string, number> = {}
  constructor(cmd: CommandType) {
    this.fileType = cmd.type
    this.recursion = cmd.recursion
    this.exclude = cmd.exclude
    this.workPath = path.resolve(process.cwd(), cmd.path)
  }

  run(): void {
    try {
      this.branchCondition(this.workPath, true)
      this.complete()
    } catch (error) {
      log(chalk.red(error.message))
    }
  }

  statLines(workPath: string): void {
    const files = fs.readdirSync(workPath)
    const bar = new ProgressBar(`:bar :current / :total`, { total: files.length, clear: true });
    files.forEach(file => {
      const filePath = path.resolve(`${workPath}/${file}`)
      this.branchCondition(filePath, this.recursion)
      bar.tick();
    })
  }

  /** 
   * 分支条件处理
   * filePath  filePath
   * recursion if filePath is directory，recursion next level
  */
  branchCondition(filePath: string, recursion: boolean) {
    // 获取当前文件夹是否是用户排除的文件夹
    let isExclude = this.exclude.find(dirName => dirName === path.basename(filePath))

    if (fs.lstatSync(filePath).isDirectory() && recursion && !isExclude) {
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
      const allStat: Record<string, number> = {}
      const sumStat: Record<string, number> = {}
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

      for (let p in this.fileStatInfo) {
        log(`${chalk.green(p)}: ${chalk.bold.yellow(this.fileStatInfo[p])}`)
      }
      for (let k in allStat) {
        log(`\nThere are ${chalk.bold.green(sumStat[k])} ${k} files, ${chalk.bold.green(allStat[k])} lines in total`)
      }
    } else {
      log(chalk.red(`${this.fileType} file not found`))
    }
  }
}

export default StatLine
