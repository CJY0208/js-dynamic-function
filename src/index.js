const isFunction = value => typeof value === 'function'
const isPromise = value => !!value && isFunction(value.then)
const parseConfig = config =>
  typeof config === 'function'
    ? {
        getExecutor: config
      }
    : config

export default class DynamicFunction {
  constructor(config) {
    const { name = '', getExecutor } = parseConfig(config)

    const func = function(...args) {
      let executor = getExecutor.apply(this, args)

      switch (isPromise(executor)) {
        case true:
          return new Promise(resolve => {
            executor.then(executor =>
              resolve(
                isFunction(executor) ? executor.apply(this, args) : undefined
              )
            )
          })
        case false:
        default:
          return isFunction(executor) ? executor.apply(this, args) : undefined
      }
    }

    func.getExecutor = getExecutor
    func.getName = () => name
    func.getLength = function(...args) {
      let executor = getExecutor.apply(this, args)

      switch (isPromise(executor)) {
        case true:
          return new Promise(resolve => {
            executor.then(executor =>
              resolve(isFunction(executor) ? executor.length : -1)
            )
          })
        case false:
        default:
          return isFunction(executor) ? executor.length : -1
      }
    }
    func.isExecutable = function(...args) {
      let executor = getExecutor.apply(this, args)

      switch (isPromise(executor)) {
        case true:
          return new Promise(resolve => {
            executor.then(executor => resolve(isFunction(executor)))
          })
        case false:
        default:
          return isFunction(executor)
      }
    }

    return func
  }
}
