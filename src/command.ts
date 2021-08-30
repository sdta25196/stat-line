import StatLine from './statLine'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { log } from './utils'

export type CommandType = {
  path: string,
  type: string[],
  help: boolean,
  recursion: boolean
}

/**
 * 支持的命令行
 */
class Command {
  cmd: CommandType

  constructor(commandObj: CommandType) {
    this.handleType(commandObj.type)
    this.cmd = commandObj
  }

  start() {
    if (this.cmd.help) {
      const content = fs.readFileSync(path.resolve(__dirname, '../static/help.txt'), 'utf-8')
      log(content)
      return
    }

    const sl = new StatLine(this.cmd)
    sl.run()
  }

  // 处理type前缀点
  handleType(fileType: string[]): void {
    fileType.forEach((item, i, arr) => {
      if (!item.startsWith(".")) {
        arr[i] = `.${item}`
      }
    })
  }
}

export default Command