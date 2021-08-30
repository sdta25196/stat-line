// import StatLine from '../es/statLine'
// import StatLine from '../src/statLine'
import Command, { CommandType } from '../src/command'

test('测试统计', () => {
  let commandObj: CommandType = {
    path: __dirname,
    type: ['js'],
    help: false,
    recursion: false
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});
test('测试指定文件类型统计', () => {
  let commandObj: CommandType = {
    path: __dirname,
    type: ['css'],
    help: false,
    recursion: false
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});
test('测试指定文件统计', () => {
  let commandObj: CommandType = {
    path: __dirname + '/a.js',
    type: ['js'],
    help: false,
    recursion: false
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});
test('测试不存在的文件类型统计', () => {
  let commandObj: CommandType = {
    path: __dirname,
    type: ['dart'],
    help: false,
    recursion: false
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});
test('测试多文件类型统计', () => {
  let commandObj: CommandType = {
    path: __dirname,
    type: ['.css', 'js'],
    help: false,
    recursion: false
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});
test('测试help', () => {
  let commandObj: CommandType = {
    path: __dirname,
    type: ['js'],
    help: true,
    recursion: false
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});
test('测试递归', () => {
  let commandObj: CommandType = {
    path: __dirname,
    type: ['css', 'js'],
    help: false,
    recursion: true
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});
test('测试出错', () => {
  let commandObj: CommandType = {
    path: __dirname + './error/a',
    type: ['css', 'js'],
    help: false,
    recursion: true
  }
  const cmd = new Command(commandObj)
  expect(cmd.start()).toBeUndefined()
});