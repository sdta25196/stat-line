const StatLine = require('../src/statLine')

test('测试统计工具-js', () => {
  const sl = new StatLine(__dirname, '.js')
  expect(sl.run()).toBe();
});
test('测试统计工具-css', () => {
  const sl = new StatLine(__dirname, '.css')
  expect(sl.run()).toBe();
});