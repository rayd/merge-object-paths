# merge-object-paths
A tiny Javascript library for merging values into an object at dot-notated paths.

## API

### `mergePaths(targetObject, values)`
* `targetObject: Object` - The object into which the values should be merged.
* `values: Object` - An object containing dot-notated paths as keys and the desired values at those paths as values. The `mergePaths` function will either create or update the value in `targetObject` that is accessible via the path specified. If the desired `value` is an object, that object will be merged with the object present at the path in `targetObject` (see the `levelOne.levelTwo.levelThree` update below for an example). Non-object values will overwrite the value present in `targetObject`.

## Installation

Install with `npm install --save merge-object-paths`.

## Usage

```javascript
// ES6.

import { mergePaths } from 'merge-object-paths';

const someObject = {
  levelOne: {
    levelTwo: {
      value: 'two',
      levelThree: {
        value: 'three'
      }
    }
  }
};

const newObject = mergePaths(someObject, {
  'levelOne.levelTwo.value': 'TWO',
  'levelOne.levelTwo.levelThree': { 
    anotherValue: 3
  },
  'levelOne.foo.bar': true
});

// Prints 'TWO'
console.log(newObject.levelOne.levelTwo.value);
// Prints 'three'
console.log(newObject.levelOne.levelTwo.levelThree.value);
// Prints 3
console.log(newObject.levelOne.levelTwo.levelThree.anotherValue);
// Prints true
console.log(newObject.levelOne.foo.bar);
```
Play around with this example on RunKit [here](https://runkit.com/5869958ce5ee9400130f803d/5869958ce5ee9400130f803e).
