const { assert } = require('chai')
const { default: DynamicFunction } = require('../index')

describe('DynamicFunction 功能测试', () => {
  it('README 示例', () => {
    let flag = false

    let getExecutorTimes = 0
    let runTimes = 0

    const fn = new DynamicFunction(() => {
      getExecutorTimes++
      if (!flag) {
        return null
      }

      return (a, b) => {
        runTimes++
        return a + b
      }
    })

    assert.equal(fn.isExecutable(), false) // false
    assert.equal(getExecutorTimes, 1)
    assert.equal(runTimes, 0)
    assert.equal(fn(1, 2), undefined) // 无反应
    assert.equal(getExecutorTimes, 2)
    assert.equal(runTimes, 0)

    flag = true
    assert.equal(fn.isExecutable(), true) // true
    assert.equal(getExecutorTimes, 3)
    assert.equal(runTimes, 0)
    assert.equal(fn(1, 2), 3) // 3
    assert.equal(getExecutorTimes, 4)
    assert.equal(runTimes, 1)

    flag = false
    assert.equal(fn.isExecutable(), false) // false
    assert.equal(getExecutorTimes, 5)
    assert.equal(runTimes, 1)
    assert.equal(fn(1, 2), undefined) // 无反应
    assert.equal(getExecutorTimes, 6)
    assert.equal(runTimes, 1)
  })

  it('异步', async () => {
    const delay = time => new Promise(resolve => setTimeout(resolve, time))

    const fn = new DynamicFunction(async () => {
      await delay(1000)

      return function test(a, b) {
        return a + b
      }
    })

    assert.equal(
      JSON.stringify(
        await Promise.all([
          fn(1, 2), // log '3' after 1000 ms
          fn.isExecutable(), // log 'true' after 1000 ms
          fn.getName(), // log 'test' after 1000 ms
          fn.getLength() // log '2' after 1000 ms
        ])
      ),
      JSON.stringify([3, true, 'test', 2])
    )
  })

  it('其他 / 名字', () => {

    let fn
    fn = new DynamicFunction('test', () => undefined)

    assert.equal(fn.getName(), 'test') // test

    // or

    fn = new DynamicFunction({
      name: 'test',
      getExecutor: () => undefined
    })

    assert.equal(fn.getName(), 'test') // test

    fn = new DynamicFunction(() => {
      return function test() {
        // nothing
      }
    })

    assert.equal(fn.getName(), 'test') // test
  })

  it('其他 / 长度', () => {

    let fn = new DynamicFunction(() => {
      return function test(a, b) {
        // nothing
      }
    })

    assert.equal(fn.getLength(), 2) // 2
  })
})
