var { prop, getter, setter } = require('./')
var test = require('tape')

test('define properties', function (t) {
  var obj = {}
  var count = 0

  prop(obj, 'first', 'stuff')
  t.equal(obj.first, 'stuff')
  t.throws(function () { prop(obj, 'first', 'other') })
  obj.first = 'other'
  t.equal(obj.first, 'stuff')

  prop(obj, 'second', 'stuff', 'c')
  prop(obj, 'second', 'other')
  t.equal(obj.second, 'other')

  prop(obj, 'third', 'stuff', 'w')
  obj.third = 'other'
  t.equal(obj.third, 'other')

  prop(obj, 'fourth', 'stuff', 'E')
  for (var p in obj) {
    t.equal(p, 'fourth')
    t.notOk(p === 'first')
    t.notOk(p === 'second')
    t.notOk(p === 'third')
    count++
  }

  t.equal(count, 1)
  t.end()
})

test('getters/setters', function (t) {
  var obj = {}
  var private = {}

  getter(obj, 'forbidden', new Error('cannot get'))
  setter(obj, 'forbidden', new Error('cannot set'))
  t.throws(function () { obj.forbidden = 'stuff' })
  t.throws(function () { return obj.forbidden })

  getter(obj, 'nope', () => 'stuff')
  setter(obj, 'nope', false)
  obj.nope = 'other'
  t.equal(obj.nope, 'stuff')
  getter(obj, 'nope', false)
  t.equal(obj.nope, undefined)

  getter(obj, 'first', function () { return private.first })
  setter(obj, 'first', function (val) { private.first = val })
  t.equal(obj.first, undefined)
  obj.first = 'stuff'
  t.equal(obj.first, 'stuff')
  t.end()
})
