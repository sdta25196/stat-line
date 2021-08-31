<h1 align="center">
	<br> 
	<br> 
	<img width="420" src="./static/logo.png" alt="stat-line">
	<br> 
	<br>
	<br>
</h1>

> 一款可指定文件类型的代码行数统计工具

[![Coverage Status](https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_100.svg)](https://coveralls.io/github/chalk/chalk?branch=main)

[English document](https://github.com/sdta25196/stat-line/blob/master/readme.md)

## 安装

```js
  npm i stat-line -g
```

## 使用

```js
  line [path] [options]
```

## path
  
  使用相对定位，默认为 `./`

## options
  
  * `-r` &nbsp;&nbsp;&nbsp;&nbsp; 向下开启递归文件夹，默认不进行递归
  * `-t` &nbsp;&nbsp;&nbsp;&nbsp; 指定要统计的文件类型
  * `-h` &nbsp;&nbsp;&nbsp;&nbsp; 显示帮助信息
  
## 示例

* 默认统计当前路径下的`js`文件,
```js
  line   
```

* 如果想要开启递归获取所有文件请使用 -r
```js
  line -r
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

## 清单

- [ ] 指定不需要扫描的文件夹
