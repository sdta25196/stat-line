# stat-line

A line of code statistics tool and can specify file type

[中文文档](https://github.com/sdta25196/stat-line/blob/master/readme_CN.md)

## Installation

```js
  npm i stat-line -g
```

## Usage

```js
  line [path] [Options]
```

## Examples

* All `JS` files in the current path are counted by default
```js
  line   
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

- [ ] Whether recursive folders are required 
- [ ] Specify folders that do not need statistics
