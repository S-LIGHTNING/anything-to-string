import { describe, expect, test } from "@jest/globals"

import { Rules, stringify } from "../src"

const data: unknown[] = [ , null, undefined, "test", 1, true ]

describe("Array to string", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(data, { rules: Rules.MINIMUM })).toBe("Array(6)")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(data, { rules: Rules.LESSER })).toBe(`Array [
    None,
    null,
    undefined,
    \"test\",
    1,
    true
]`)
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(data, { rules: Rules.MAJOR })).toBe(`Array {
    1: null
    2: undefined
    3: [string: \"test\"]
    4: [number: 1]
    5: [boolean: true]
    length: [number: 6]
}`)
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(data, { rules: Rules.MAXIMUM }))
    })
})
