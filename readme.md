# stat-line

A line of code statistics tool and can assign file type

[中文文档](https://github.com/sdta25196/stat-line/blob/master/readme_CN.md)

## Installation

```js
  npm i stat-line -g
```

## Usage

```js
  line [path] [--type]
```

## Examples

* All `JS` files in the current path are counted by default
```js
  line   
```
  
* statistics current path `scss` file
```js
  // Methods a
  line --type scss

  // Methods b
  line ./ --type scss 
```

* custom path
```js
  // [./src] Change to your custom relative path
  line ./src
```

* Display help information
```js
  line --help 
```
  
## todoList：

- [ ] Whether recursive folders are required 
- [ ] use typescript rewrite
- [ ] Specify folders that do not need statistics
- [ ] Multiple file types can be specified
