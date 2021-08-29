const StatLine = require('../es/statLine').default
// const StatLine = require('../src/statLine')

test('测试统计工具-js', () => {
  const sl = new StatLine(__dirname)
  expect(sl.run()).toBeUndefined()
});
test('测试统计工具-css', () => {
  const sl = new StatLine(__dirname, 'css')
  expect(sl.run()).toBeUndefined()
});
test('测试统计工具-指定文件统计', () => {
  const sl = new StatLine(__dirname + '/a.js')
  expect(sl.run()).toBeUndefined()
});
test('测试统计工具-没有类型', () => {
  const sl = new StatLine(__dirname, 'null')
  expect(sl.run()).toBeUndefined()
});