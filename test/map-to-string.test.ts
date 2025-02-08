import { describe, expect, test } from "@jest/globals"

import { Rules, stringify } from "../src"

const data = new Map<unknown, unknown>()
data.set(null, undefined)
data.set({ a: "test" }, [ 1, true ])

describe("Map to string", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(data, { rules: Rules.MINIMUM })).toBe("Map(2)")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(data, { rules: Rules.LESSER })).toBe(`Map {
    [[Entries]]:${" "}
        null: undefined
        Object {
            a: \"test\"
        }: [
            1,
            true
        ]
}`)
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(data, { rules: Rules.MAJOR })).toBe(`Map {
    [[Entries]]:${" "}
        0:${" "}
            key: null
            value: undefined
        1:${" "}
            key: Object {
                a: [string: \"test\"]
            }
            value: Array {
                0: [number: 1]
                1: [boolean: true]
                length: [number: 2]
            }
}`)
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(data, { rules: Rules.MAXIMUM }))
    })
})
