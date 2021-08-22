# 一款可指定类型的代码行数统计工具

### 安装

```js
  npm i stat-line -g
```

### 使用

```js
  line path [--type]
```

### 示例
```js
  // 默认统计当前路径下所有的.js文件
  line   
```
  或者
```js
  // 指定统计当前路径下所有的scss文件
  line ./ --type .scss 
```

### 待完成：

- [ ] 是否需要递归文件夹
