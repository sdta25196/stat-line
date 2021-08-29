# stat-line

一款可指定文件类型的代码行数统计工具

[English document](https://github.com/sdta25196/stat-line/blob/master/readme.md)

## 安装

```js
  npm i stat-line -g
```

## 使用

```js
  line [path] [Options]
```

## 示例

* 默认统计当前路径下所有的`js`文件
```js
  line   
```

* 指定统计当前路径下所有的`scss`文件行数
```js
  // 方式一
  line -t scss

  // 方式二
  line ./ -t scss 
```

* 指定统计当前路径下所有的`scss`、`css`、`js`文件行数
```js
  // 方式一
  line -t scss css js
```

* custom 自定义路径
```js
  // [./src] 改成你自己的相对路径即可
  line ./src
```
* 显示帮助信息
```js
  line -h
```

## 清单：

- [ ] 是否需要递归文件夹
- [ ] 指定不需要扫描的文件夹
