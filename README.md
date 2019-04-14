# DynamicFunction

动态函数，类似于多态函数，但不限于按参数类型条件切换执行体

- - -

## 定义

动态函数是一种特殊的函数，在函数执行前，需要先获取函数执行体，如果获得的执行体为非函数，则动态函数将不执行

同时，动态函数拥有一个方法 `isExecutable` 用以检测动态函数是否可以被执行

- - -

## 示例

```javascript
let flag = false

const dynamicFunc = new DynamicFunction(() => {
  if (!flag) {
    return null
  }

  return (a, b) => a + b
})

dynamicFunc.isExecutable() // false
dynamicFunc(1, 2) // 无反应

flag = true
dynamicFunc.isExecutable() // true
dynamicFunc(1, 2) // 3

flag = false
dynamicFunc.isExecutable() // false
dynamicFunc(1, 2) // 无反应
```

- - -

## 粗略实现

```javascript
const isFunction = value => typeof value === 'function'

function DynamicFunction(getExecutor) {
  
  const func = (...args) => {
    const executor = getExecutor(...args)

    if (!isFunction(executor)) {
      return
    }

    return executor(...args)
  }

  func.isExecutable = (...args) => isFunction(getExecutor(...args))

  return func
}
```