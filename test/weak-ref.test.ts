import { describe, expect, test } from "@jest/globals"

import { Rules, stringify } from "../src"

const data = new WeakRef({
    a: null,
    b: undefined,
    c: "test",
    d: 1,
    e: true
})

describe("WeakRef to string", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(data, { rules: Rules.MINIMUM })).toBe("[WeakRef]")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(data, { rules: Rules.LESSER })).toBe(`WeakRef {
    [[WeakRefTarget]]: Object {
        a: null
        b: undefined
        c: \"test\"
        d: 1
        e: true
    }
}`)
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(data, { rules: Rules.MAJOR })).toBe(`WeakRef {
    [[WeakRefTarget]]: Object {
        a: null
        b: undefined
        c: [string: \"test\"]
        d: [number: 1]
        e: [boolean: true]
    }
}`)
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(data, { rules: Rules.MAXIMUM }))
    })
})
