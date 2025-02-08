# Anything To String

Converts anything in JavaScript to a string.

Supports

- null
- undefined
- string
- number
- boolean
- String
- Number
- Boolean
- RegExp
- Symbol
- BigInt
- Set
- Map
- WeakRef
- Error
- HTMLElement
- Array
- Object
- Function (includes arrow function and class)

## Install

```
$ npm install @slightning/anything-to-string --save
```

## Use

```JavaScript
const { stringify } = require("@slightning/anything-to-string")

const basicObject = {
    null: null,
    undefined: undefined,
    string: "string",
    number: 1,
    boolean: true,
    String: new String("test"),
    Number: new Number(1),
    Boolean: new Boolean(true),
    RegExp: /test/g,
    [Symbol("Key")]: Symbol("Symbol"),
    bigint: BigInt("10000000000000000000000000000000000000000000000000000000000000000"),
    Set: new Set(),
    Map: new Map(),
    WeakRef: new WeakRef({}),
    Error: new Error("test"),
    Array: [,],
    object: {},
    get test() { return "value from getter" },
    set test(value) { console.log("set value: " + value) }
}
Object.defineProperty(basicObject, "ref", {
    value: basicObject
})

const data = {
    null: null,
    undefined: undefined,
    string: "string",
    number: 1,
    boolean: true,
    String: new String("test"),
    Number: new Number(1),
    Boolean: new Boolean(true),
    RegExp: /test/g,
    [Symbol("Key")]: Symbol("Symbol"),
    bigint: BigInt("10000000000000000000000000000000000000000000000000000000000000000"),
    Set: new Set(Object.values(basicObject)),
    Map: new Map(Object.entries(basicObject)),
    WeakRef: new WeakRef(basicObject),
    Error: new Error("test"),
    Array: Object.values(basicObject),
    object: basicObject,
    get test() { return "value from getter" },
    set test(value) { console.log("set value: " + value) }
}
Object.defineProperty(data, "ref", {
    value: data
})

console.log(stringify(data))
```

Output

```
<ref *2> Object {
    null: null
    undefined: undefined
    string: [string: "string"]
    number: [number: 1]
    boolean: [boolean: true]
    String: String("test") String {
        0: "t"
        1: "e"
        2: "s"
        3: "t"
        length: 4
    }
    Number: Number(1) {}
    Boolean: Boolean(true) {}
    RegExp: RegExp(/test/g) RegExp {
        lastIndex: 0
    }
    bigint: [bigint: 10000000000000000000000000000000000000000000000000000000000000000]
    Set: Set {
        [[Values]]:
            0: null
            1: undefined
            2: "string"
            3: 1
            4: true
            5: String("test")
            6: Number(1)
            7: Boolean(true)
            8: RegExp(/test/g)
            9: 10000000000000000000000000000000000000000000000000000000000000000
            10: Set {
                [[Values]]: None
            }
            11: Map {
                [[Entries]]: None
            }
            12: WeakRef {
                [[WeakRefTarget]]: [object Object]
            }
            13: Error: test
            14: [
                None
            ]
            15: {}
            16: "value from getter"
    }
    Map: Map {
        [[Entries]]:
            0:
                key: "null"
                value: null
            1:
                key: "undefined"
                value: undefined
            2:
                key: "string"
                value: "string"
            3:
                key: "number"
                value: 1
            4:
                key: "boolean"
                value: true
            5:
                key: "String"
                value: String("test")
            6:
                key: "Number"
                value: Number(1)
            7:
                key: "Boolean"
                value: Boolean(true)
            8:
                key: "RegExp"
                value: RegExp(/test/g)
            9:
                key: "bigint"
                value: 10000000000000000000000000000000000000000000000000000000000000000
            10:
                key: "Set"
                value: Set {
                    [[Values]]: None
                }
            11:
                key: "Map"
                value: Map {
                    [[Entries]]: None
                }
            12:
                key: "WeakRef"
                value: WeakRef {
                    [[WeakRefTarget]]: [object Object]
                }
            13:
                key: "Error"
                value: Error: test
            14:
                key: "Array"
                value: [
                    None
                ]
            15:
                key: "object"
                value: {}
            16:
                key: "test"
                value: "value from getter"
    }
    WeakRef: WeakRef {
        [[WeakRefTarget]]: <ref *1> Object {
            null: null
            undefined: undefined
            string: "string"
            number: 1
            boolean: true
            String: "test"
            Number: 1
            Boolean: true
            RegExp: /test/g
            bigint: 10000000000000000000000000000000000000000000000000000000000000000
            Set: Set(0)
            Map: Map(0)
            WeakRef: [WeakRef]
            Error: [Error]
            Array: Array(1)
            object: [object Object]
        }
    }
    Error: Error: test
        at <anonymous>:1:1
    Array: Array {
        0: null
        1: undefined
        2: "string"
        3: 1
        4: true
        5: String("test")
        6: Number(1)
        7: Boolean(true)
        8: RegExp(/test/g)
        9: 10000000000000000000000000000000000000000000000000000000000000000
        10: Set {
            [[Values]]: None
        }
        11: Map {
            [[Entries]]: None
        }
        12: WeakRef {
            [[WeakRefTarget]]: [object Object]
        }
        13: Error: test
        14: [
            None
        ]
        15: {}
        16: "value from getter"
        length: 17
    }
    object: [Circular *1]
    test: [string: "value from getter"]
    ref: [Circular *2]
    [Symbol(Key)]: Symbol(Symbol)
    get test: get test() {
        return "value from getter";
        }
    set test: set test(value) {
        console.log("set value: " + value);
        }
    [[Prototype]]: Object {
        constructor: function Object() { [native code] }
        __defineGetter__: function __defineGetter__() { [native code] }
        __defineSetter__: function __defineSetter__() { [native code] }
        hasOwnProperty: function hasOwnProperty() { [native code] }
        __lookupGetter__: function __lookupGetter__() { [native code] }
        __lookupSetter__: function __lookupSetter__() { [native code] }
        isPrototypeOf: function isPrototypeOf() { [native code] }
        propertyIsEnumerable: function propertyIsEnumerable() { [native code] }
        toString: function toString() { [native code] }
        valueOf: function valueOf() { [native code] }
        __proto__: null
        toLocaleString: function toLocaleString() { [native code] }
    }
}
```

## Config

Let's continue with the above example and make the following modifications:

```diff
- const { stringify } = require("@slightning/anything-to-string")
+ const { stringify, Rules } = require("@slightning/anything-to-string")

const basicObject = {
    null: null,
    undefined: undefined,
...

Object.defineProperty(data, "ref", {
    value: data
})

- console.log(stringify(data))
+ console.log(stringify(data, {
+     rules: Rules.LESSER,       // Rule set, Rules.LESSER keeps less information
+     depth: 0                   // Maximum depth limit, '0' means no limit
+ }))
```

Output

```
Object {
    null: null
    undefined: undefined
    string: "string"
    number: 1
    boolean: true
    String: String("test")
    Number: Number(1)
    Boolean: Boolean(true)
    RegExp: RegExp(/test/g)
    bigint: 10000000000000000000000000000000000000000000000000000000000000000
    Set: Set {
        [[Values]]:
            0: null
            1: undefined
            2: "string"
            3: 1
            4: true
            5: String("test")
            6: Number(1)
            7: Boolean(true)
            8: RegExp(/test/g)
            9: 10000000000000000000000000000000000000000000000000000000000000000
            10: Set {
                [[Values]]: None
            }
            11: Map {
                [[Entries]]: None
            }
            12: WeakRef {
                [[WeakRefTarget]]: {}
            }
            13: Error: test
            14: [
                None
            ]
            15: {}
            16: "value from getter"
    }
    Map: Map {
        [[Entries]]:
            "null": null
            "undefined": undefined
            "string": "string"
            "number": 1
            "boolean": true
            "String": String("test")
            "Number": Number(1)
            "Boolean": Boolean(true)
            "RegExp": RegExp(/test/g)
            "bigint": 10000000000000000000000000000000000000000000000000000000000000000
            "Set": Set {
                [[Values]]: None
            }
            "Map": Map {
                [[Entries]]: None
            }
            "WeakRef": WeakRef {
                [[WeakRefTarget]]: {}
            }
            "Error": Error: test
            "Array": [
                None
            ]
            "object": {}
            "test": "value from getter"
    }
    WeakRef: WeakRef {
        [[WeakRefTarget]]: Object {
            null: null
            undefined: undefined
            string: "string"
            number: 1
            boolean: true
            String: String("test")
            Number: Number(1)
            Boolean: Boolean(true)
            RegExp: RegExp(/test/g)
            bigint: 10000000000000000000000000000000000000000000000000000000000000000
            Set: Set {
                [[Values]]: None
            }
            Map: Map {
                [[Entries]]: None
            }
            WeakRef: WeakRef {
                [[WeakRefTarget]]: {}
            }
            Error: Error: test
            Array: [
                None
            ]
            object: {}
        }
    }
    Error: Error: test
    Array: [
        null,
        undefined,
        "string",
        1,
        true,
        String("test"),
        Number(1),
        Boolean(true),
        RegExp(/test/g),
        10000000000000000000000000000000000000000000000000000000000000000,
        Set {
            [[Values]]: None
        },
        Map {
            [[Entries]]: None
        },
        WeakRef {
            [[WeakRefTarget]]: {}
        },
        Error: test,
        [
            None
        ],
        {},
        "value from getter"
    ]
    object: Object {
        null: null
        undefined: undefined
        string: "string"
        number: 1
        boolean: true
        String: String("test")
        Number: Number(1)
        Boolean: Boolean(true)
        RegExp: RegExp(/test/g)
        bigint: 10000000000000000000000000000000000000000000000000000000000000000
        Set: Set {
            [[Values]]: None
        }
        Map: Map {
            [[Entries]]: None
        }
        WeakRef: WeakRef {
            [[WeakRefTarget]]: {}
        }
        Error: Error: test
        Array: [
            None
        ]
        object: {}
    }
}
```

### rules

The rule defines how to turn an object into a string. Default rules include Rules.MINIMUM, Rules.LESSER, Rules.MAJOR, Rules.MAXIMUM. Their names represent the level of detail in which information is retained.

Example

```JavaScript
const { stringify, Rules } = require("@slightning/anything-to-string")

function test() {
    console.log("hello")
}

console.log(stringify(test, {
    rules: Rules.MINIMUM
}))
// output: [Function: test]

console.log(stringify(test, {
    rules: Rules.LESSER
}))
// output: function test() { console.log("hello") }

console.log(stringify(test, {
    rules: Rules.MAJOR
}))
// output:
// function test() {
//     console.log("hello")
// }

console.log(stringify(test, {
    rules: Rules.MAXIMUM
}))
// (lots of output)
```

#### Custom Rule

```JavaScript
const { stringify, Rules } = require("@slightning/anything-to-string")

console.log(stringify("data", {
    rules: [
        new class {
            test(data) {
                return typeof data == "string" // Apply rule for strings
            }
            toString(data, config) {
                return config.ignoreString ? "" : JSON.stringify(data)
            }
        }, ...Rules.LESSER
    ],
    ignoreString: true // Custom config
}))
// output: (nothing)
```
### indent

The number of indented Spaces or indented string. Default is 4.

```JavaScript
const { stringify, Rules } = require("@slightning/anything-to-string")

console.log(stringify(["data"], {
    rules: Rules.LESSER,
    indent: 2
}))
// output:
// [
//   "data"
// ]

console.log(stringify(["data"], {
    rules: Rules.LESSER,
    indent: "|--|"
}))
// output:
// [
// |--|"data"
// ]
```

### depth

Maximum recursion depth.

### object

- `unenumerable`: Include non-enumerable attributes.
- `symbol`: Include properties with symbol as keys.
- `get`: Include computed attribute.
- `getter`: Include getter.
- `setter`: Include setter.
- `prototype`: Include prototype.

Example

```JavaScript
const { stringify, Rules } = require("@slightning/anything-to-string")

console.log(stringify({
    get a() {
        return "value from getter"
    },
    [Symbol("symbol")]: "value"
}, {
    rules: Rules.LESSER,
    object: {
        symbol: true,
        get: true,
        getter: true,
        prototype: true
    }
}))
// output:
// Object {
//     a: "value from getter"
//     [Symbol(symbol)]: "value"
//     get a: get a() { return "value from getter" }
//     [[Prototype]]: Object {
//         [[Prototype]]: null
//     }
// }
```
