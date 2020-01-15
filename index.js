var CONF = { configurable: true }

module.exports = prop
module.exports.getter = getter
module.exports.setter = setter
module.exports.prop = prop

function prop (obj, name, val, flags) {
  flags = flags ? flags.toLowerCase() : ''

  Object.defineProperty(obj, name, {
    value: val,
    configurable: flags.includes('c'),
    enumerable: flags.includes('e'),
    writable: flags.includes('w')
  })

  return obj
}

function getter (obj, name, acc) {
  var descr = descriptor(obj, name)
  descr.get = accessor(acc)
  Object.defineProperty(obj, name, descr)
  return freeze(obj, name)
}

function setter (obj, name, acc) {
  var descr = descriptor(obj, name)
  descr.set = accessor(acc)
  Object.defineProperty(obj, name, descr)
  return freeze(obj, name)
}

function accessor (a) {
  if (a === false) return noop()
  else if (a instanceof Error) return noop(a)
  return a
}

function descriptor (obj, name) {
  return Object.getOwnPropertyDescriptor(obj, name) || CONF
}

function freeze (obj, name) {
  setImmediate(function () {
    var descr = descriptor(obj, name)
    descr.configurable = false
    Object.defineProperty(obj, name, descr)
  })

  return obj
}

function noop (err) {
  if (!err) {
    return function () {}
  }
  return function () {
    throw err
  }
}
