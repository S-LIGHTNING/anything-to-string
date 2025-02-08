import { describe, expect, test } from "@jest/globals"

import { stringify } from "../src"

const data = new Map<unknown, unknown>()
data.set(null, undefined)
data.set({ a: "test" }, [ 1, true ])

describe("config", (): void => {
    test("default", (): void => {
        expect(stringify(data)).toBe(`Map {
    [[Entries]]:${" "}
        0:${" "}
            key: null
            value: undefined
        1:${" "}
            key: Object {
                a: \"test\"
            }
            value: Array {
                0: 1
                1: true
                length: 2
            }
    [[Prototype]]: Object {
        constructor: function Map() { [native code] }
        get: function get() { [native code] }
        set: function set() { [native code] }
        has: function has() { [native code] }
        delete: function delete() { [native code] }
        clear: function clear() { [native code] }
        entries: function entries() { [native code] }
        forEach: function forEach() { [native code] }
        keys: function keys() { [native code] }
        size: [Exception: TypeError: Method get Map.prototype.size called on incompatible receiver #<Map>]
        values: function values() { [native code] }
        [Symbol(Symbol.toStringTag)]: \"Map\"
        [Symbol(Symbol.iterator)]: function entries() { [native code] }
    }
}`)
    })
})
