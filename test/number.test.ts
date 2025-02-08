import { describe, expect, test } from "@jest/globals"
import stringify, { Rules } from "../src"

const data = new Number(1)

describe("Number to string", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(data, { rules: Rules.MINIMUM })).toBe("1")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(data, { rules: Rules.LESSER })).toBe("Number(1)")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(data, { rules: Rules.MAJOR })).toBe("Number(1) {}")
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(data, { rules: Rules.MAXIMUM }))
    })
})
