import StatLine from '../es/statLine'
// import StatLine from '../src/statLine'

test('测试统计', () => {
  const sl = new StatLine(__dirname, ['js'])
  expect(sl.run()).toBeUndefined()
});
test('测试指定文件类型统计', () => {
  const sl = new StatLine(__dirname, ['css'])
  expect(sl.run()).toBeUndefined()
});
test('测试指定文件统计', () => {
  const sl = new StatLine(__dirname + '/a.js', ['.js'])
  expect(sl.run()).toBeUndefined()
});
test('测试不存在的文件类型统计', () => {
  const sl = new StatLine(__dirname, ['dart'])
  expect(sl.run()).toBeUndefined()
});
test('测试多文件类型统计', () => {
  const sl = new StatLine(__dirname, ['css', 'js'])
  expect(sl.run()).toBeUndefined()
});