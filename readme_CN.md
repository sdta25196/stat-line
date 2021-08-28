# stat-line

一款可指定类型的代码行数统计工具

[English document](https://github.com/sdta25196/stat-line/blob/master/readme.md)

## 安装

```js
  npm i stat-line -g
```

## 使用

```js
  line path [--type]
```

## 示例

* 默认统计当前路径下所有的.js文件
```js
  line   
```

* 指定统计当前路径下所有的scss文件
```js
  // 方式一
  line --type .scss

  // 方式二
  line ./ --type .scss 
```

* 显示帮助信息
```js
  line --help
```

## 清单：

- [ ] 是否需要递归文件夹
- [ ] 使用typescript重写
