import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { getIndentString } from "../utils"
import { AnythingRule } from "./anything"
import { MajorObjectRule, MaximumObjectRule } from "./object"

export class MinimumArrayRule implements Rule<Array<unknown>> {

    public test: typeof Array.isArray = Array.isArray

    public toString(
        this: this,
        data: Array<unknown>,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `Array(${data.length})`
    }
}

export class LesserArrayRule implements Rule<Array<unknown>> {

    public test: typeof Array.isArray = Array.isArray

    public prepare(
        this: this,
        data: Array<unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        for (const value of data) {
            if (value != undefined) {
                new AnythingRule().prepare(value, config, context)
            }
        }
    }

    public toString(
        this: this,
        data: Array<unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        if (data.length == 0) {
            return "Array []"
        }
        let result: string = "Array [\n"
        result += (
                0 in data ? new AnythingRule().toString(data[0], config, context) : "None"
            ).split("\n").map((line: string): string =>
                `${getIndentString(config)}${line}`
            ).join("\n")
        for (let i: number = 1; i < data.length; i++) {
            result += `,\n${(
                    i in data ? new AnythingRule().toString(data[i], config, context) : "None"
                ).split("\n").map((line: string): string =>
                    `${getIndentString(config)}${line}`
                ).join("\n")}`
        }
        result += "\n]"
        return result
    }
}

export class MajorArrayRule implements Rule<Array<unknown>> {

    public test: typeof Array.isArray = Array.isArray

    public prepare(
        this: this,
        data: Array<unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Array<unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new MajorObjectRule().toString(data, config, context)
    }
}

export class MaximumArrayRule implements Rule<Array<unknown>> {

    public test: typeof Array.isArray = Array.isArray

    public prepare(
        this: this,
        data: Array<unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Array<unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new MajorObjectRule().toString(data, config, context)
    }
}
