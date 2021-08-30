# stat-line

<h1 align="center">
	<br>
	<img width="320" src="./static/logo.png" alt="stat-line">
	<br>
	<br>
</h1>

[![Coverage Status](https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_100.svg)](https://coveralls.io/github/chalk/chalk?branch=main)

> A line of code statistics tool and can specify file type

[中文文档](https://github.com/sdta25196/stat-line/blob/master/readme_CN.md)

## Installation

```js
  npm i stat-line -g
```

## Usage

```js
  line [path] [options]
```

## path
  
  If you want to use [path]. You need to use relative path.
  default [path] is [./]

## options
  
  * `-r`    Open recursion folders, no recursion by default
  * `-t`    Specify the type of file to be counted
  * `-h`    Display help information

## Examples

* All `JS` files in the current path are counted by default
```js
  line   
```

* If you need recursion all folder, please use `-r`
```js
  line -r
```
  
* count current path `scss` file lines
```js
  // Methods a
  line -t scss

  // Methods b
  line ./ -t scss 
```
* count current path `scss` `css` `js` file lines
```js
  line -t scss css js
```

* custom path
```js
  // [./src] Change to your custom relative path
  line ./src
```

* Display help information
```js
  line -h
```
  
## todoList：

- [ ] Specify folders that do not need statistics
