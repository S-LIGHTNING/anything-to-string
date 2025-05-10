import { describe, expect, test } from "@jest/globals"
import stringify, { Rules } from "../src"

const data = new String("test")

describe("String to string", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(data, { rules: Rules.MINIMUM })).toBe("\"test\"")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(data, { rules: Rules.LESSER })).toBe("String(\"test\")")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(data, { rules: Rules.MAJOR })).toBe(`String(\"test\") String {
    length: [number: 4]
}`)
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(data, { rules: Rules.MAXIMUM }))
    })
})
