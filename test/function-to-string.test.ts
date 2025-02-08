import { describe, expect, test } from "@jest/globals"
import stringify, { Rules } from "../src"

function commonFunction(message: unknown): void {
    console.log(message)
}

const arrowFunction: (message: unknown) => void = (message: unknown): void => {
    console.log(message)
}

class classFunction {
    constructor() {
        console.log("test")
    }
}

function longFunction(message: unknown): void {
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
}

const longArrowFunction: (message: unknown) => void = (message: unknown): void => {
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
    console.log(message)
}

class longClassFunction {
    constructor(message: unknown) {
        console.log(message)
        console.log(message)
        console.log(message)
        console.log(message)
        console.log(message)
        console.log(message)
        console.log(message)
    }
}

describe("function to string", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(commonFunction, { rules: Rules.MINIMUM })).toBe("[Function: commonFunction]")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(commonFunction, { rules: Rules.LESSER })).toBe("function commonFunction(message) { console.log(message); }")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(commonFunction, { rules: Rules.MAJOR })).toBe(commonFunction.toString())
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(commonFunction, { rules: Rules.MAXIMUM }))
    })
})

describe("function to string (arrow function)", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(arrowFunction, { rules: Rules.MINIMUM })).toBe("[Function: arrowFunction]")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(arrowFunction, { rules: Rules.LESSER })).toBe("message => { console.log(message); }")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(arrowFunction, { rules: Rules.MAJOR })).toBe(arrowFunction.toString())
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(arrowFunction, { rules: Rules.MAXIMUM }))
    })
})

describe("function to string (class)", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(classFunction, { rules: Rules.MINIMUM })).toBe("[Function: classFunction]")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(classFunction, { rules: Rules.LESSER })).toBe("class classFunction { constructor() { console.log(\"test\"); } }")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(classFunction, { rules: Rules.MAJOR })).toBe(classFunction.toString())
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(classFunction, { rules: Rules.MAXIMUM }))
    })
})

describe("function to string (long function)", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(longFunction, { rules: Rules.MINIMUM })).toBe("[Function: longFunction]")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(longFunction, { rules: Rules.LESSER })).toBe("function longFunction(message) { ... }")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(longFunction, { rules: Rules.MAJOR })).toBe(longFunction.toString())
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(longFunction, { rules: Rules.MAXIMUM }))
    })
})

describe("function to string (long arrow function)", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(longArrowFunction, { rules: Rules.MINIMUM })).toBe("[Function: longArrowFunction]")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(longArrowFunction, { rules: Rules.LESSER })).toBe("message => { ... }")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(longArrowFunction, { rules: Rules.MAJOR })).toBe(longArrowFunction.toString())
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(longArrowFunction, { rules: Rules.MAXIMUM }))
    })
})

describe("function to string (long class)", (): void => {
    test("rules: Rules.MINIMUM", (): void => {
        expect(stringify(longClassFunction, { rules: Rules.MINIMUM })).toBe("[Function: longClassFunction]")
    })
    test("rules: Rules.LESSER", (): void => {
        expect(stringify(longClassFunction, { rules: Rules.LESSER })).toBe("class longClassFunction { ... }")
    })
    test("rules: Rules.MAJOR", (): void => {
        expect(stringify(longClassFunction, { rules: Rules.MAJOR })).toBe(longClassFunction.toString())
    })
    test.skip("rules: Rules.MAXIMUM", (): void => {
        console.log(stringify(longClassFunction, { rules: Rules.MAXIMUM }))
    })
})
