# DynamicFunction

动态函数，类似于多态函数，但不限于按参数类型条件切换执行体

- - -

## 简介

### 定义

动态函数是一种特殊的函数，在函数执行前，需要先调用 `getExecutor` 方法获取函数执行体，如果获得的执行体为非函数，则动态函数将不执行

同时，动态函数拥有一个方法 `isExecutable` 用以检测动态函数是否可以被执行

### 声明方式

```javascript
new DynamicFunction(getExecutor)
// or
new DynamicFunction(name, getExecutor)
// or
new DynamicFunction({ name, getExecutor })
```

- - -

## 示例

```javascript
let flag = false

const fn = new DynamicFunction(() => {
  if (!flag) {
    return null
  }

  return (a, b) => a + b
})

fn.isExecutable() // false
fn(1, 2) // nothing happen

flag = true
fn.isExecutable() // true
fn(1, 2) // 3

flag = false
fn.isExecutable() // false
fn(1, 2) // nothing happen
```

- - -

## 异步

若 `getExecutor` 函数为异步，则其执行过程及相关方法均为异步

```javascript

var delay = time => new Promise(resolve => setTimeout(resolve, time))

var fn = new DynamicFunction(async () => {
  await delay(1000)

  return function test(a, b) {
    return a + b
  }
})

await fn(1, 2) // log '3' after 1000 ms
await fn.isExecutable() // log 'true' after 1000 ms
await fn.getName() // log 'test' after 1000 ms
await fn.getLength() // log '2' after 1000 ms
```

- - -

## 其他

### 名字

显式声明函数名

```javascript
var fn = new DynamicFunction('test', () => {...})

// or

var fn = new DynamicFunction({
  name: 'test', 
  getExecutor: () => {...}
})

fn.getName() // test
```

若未显式声明函数名，则使用 `executor` 的名称

```javascript
var fn = new DynamicFunction(() => {
  return function test() {...}
})

fn.getName() // test
```

### 参数个数 / 长度

无法显式声明，使用 `executor` 的长度

```javascript
var fn = new DynamicFunction(() => {
  return function test(a, b) {...}
})

fn.getLength() // 2
```
