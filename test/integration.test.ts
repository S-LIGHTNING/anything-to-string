import { describe, test } from "@jest/globals"

import { Rules, stringify } from "../src"

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
    get test(): string { return "value from getter" },
    set test(value: string) { console.log("set value: " + value) }
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
    get test(): string { return "value from getter" },
    set test(value: string) { console.log("set value: " + value) }
}
Object.defineProperty(data, "ref", {
    value: data
})

describe("integration", (): void => {
    test.skip("default", (): void => {
        console.log(stringify(data))
    })
    test("rules: Rules.LESSER, depth: 0", (): void => {
        console.log(stringify(data, {
            rules: Rules.LESSER,
            depth: 0
        }))
    })
})
