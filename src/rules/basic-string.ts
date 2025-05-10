import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isBasicString(data: unknown): data is string {
    return typeof data == "string"
}

function excludeChar(data: string, key: PropertyKey): boolean {
    if (typeof key == "string") {
        key = parseInt(key)
    }
    if (!Number.isInteger(key)) {
        return false
    }
    return typeof key == "number" && 0 <= key && key < data.length
}

export class MinimumBasicStringRule implements Rule<string> {

    public test: typeof isBasicString = isBasicString

    public toString(
        this: this,
        data: string,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return JSON.stringify(data)
    }
}

export class LesserBasicStringRule implements Rule<string> {

    public test: typeof isBasicString = isBasicString

    public toString(
        this: this,
        data: string,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return JSON.stringify(data)
    }
}

export class MajorBasicStringRule implements Rule<string> {

    public test: typeof isBasicString = isBasicString

    public toString(
        this: this,
        data: string,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `[string: ${JSON.stringify(data)}]`
    }
}

export class MaximumBasicStringRule implements Rule<string> {

    public test: typeof isBasicString = isBasicString

    public prepare(
        this: this,
        data: string,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule({
            defaultConfig: {
                exclude(key: PropertyKey): boolean {
                    return excludeChar(data, key)
                }
            }
        }).prepare(data, config, context)
    }

    public toString(
        this: this,
        data: string,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `[string: ${JSON.stringify(data)}] ${
            new MaximumObjectRule({
                defaultConfig: {
                    exclude(key: PropertyKey): boolean {
                        return excludeChar(data, key)
                    }
                }
            }).toString(data, config, context)
        }`
    }
}
