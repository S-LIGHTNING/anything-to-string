import { describe, expect, test } from "@jest/globals"

import { Rules, stringify } from "../src"

const data = new Set<unknown>([null, undefined, "test", 1, true, {
    a: null,
    b: undefined,
    c: "test",
    d: 1,
    e: true
}])

describe("Set to string", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(data, { rules: Rules.MINIMUM })).toBe("Set(6)")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(data, { rules: Rules.LESSER })).toBe(`Set {
    [[Values]]:${" "}
        0: null
        1: undefined
        2: \"test\"
        3: 1
        4: true
        5: Object {
            a: null
            b: undefined
            c: \"test\"
            d: 1
            e: true
        }
}`)
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(data, { rules: Rules.MAJOR })).toBe(`Set {
    [[Values]]:${" "}
        0: null
        1: undefined
        2: [string: \"test\"]
        3: [number: 1]
        4: [boolean: true]
        5: Object {
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
