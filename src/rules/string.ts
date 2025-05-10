import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MajorObjectRule, MaximumObjectRule } from "./object"

function isString(data: unknown): data is String {
    return typeof data == "object" && data instanceof String
}

function excludeChar(data: String, key: PropertyKey): boolean {
    if (typeof key == "string") {
        key = parseInt(key)
    }
    if (!Number.isInteger(key)) {
        return false
    }
    return typeof key == "number" && 0 <= key && key < data.length
}

export class MinimumStringRule implements Rule<String> {

    public test: typeof isString = isString

    public toString(
        this: this,
        data: String,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return JSON.stringify(data)
    }
}

export class LesserStringRule implements Rule<String> {

    public test: typeof isString = isString

    public toString(
        this: this,
        data: String,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `String(${JSON.stringify(data)})`
    }
}

export class MajorStringRule implements Rule<String> {

    public test: typeof isString = isString

    public prepare(
        this: this,
        data: String,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule({
            defaultConfig: {
                exclude(key: PropertyKey): boolean {
                    return excludeChar(data, key)
                }
            }
        }).prepare(data, config, context)
    }

    public toString(
        this: this,
        data: String,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `String(${JSON.stringify(data)}) ${
            new MajorObjectRule({
                defaultConfig: {
                    exclude(key: PropertyKey): boolean {
                        return excludeChar(data, key)
                    }
                }
            }).toString(data, config, context)
        }`
    }
}

export class MaximumStringRule implements Rule<String> {

    public test: typeof isString = isString

    public prepare(
        this: this,
        data: String,
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
        data: String,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `String(${JSON.stringify(data)}) ${
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
