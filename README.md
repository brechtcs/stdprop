# stdprop

Define object properties without boilerplate

## Usage

With this modules, you can define object properties using the following shorthand (original longhand included for reference):

```js
var prop = require('stdprop')
var obj = {}

// non-enumerable and non-writable
// with stdprop:
prop(obj, 'one', 'stuff')

// previously:
Object.defineProperty(obj, 'stuff', {
  value: 'stuff'
})

// enumerable and non-writable
// with stdprop:
prop(obj, 'one', 'stuff', 'e')

// previously:
Object.defineProperty(obj, 'stuff', {
  value: 'stuff',
  enumerable: true
})

// enumerable and writable
// with stdprop:
prop(obj, 'one', 'stuff', 'ew')

// previously:
Object.defineProperty(obj, 'stuff', {
  value: 'stuff',
  enumerable: true,
  writable: true
})
```

### getters & setters

Also included are two shorthand methods to create getters and setters on any given object.

```js
var { getter, setter } = require('stdprop')

var interface = {}
var storage = {}
setter(interface, 'shout', function (str) { storage.shout = str.toUpperCase() })
getter(interface, 'shout', function () { return storage.shout + '!' })

interface.shout = 'hello'
console.log(interface.shout) // => 'HELLO!'
console.log(storage.shout) // => 'HELLO'
```

## Acknowledgement

The idea of using shorthand flags to create property descriptors was taken from the existing module [prr](https://npmjs.org/package/prr).

## License

Apache-2.0
