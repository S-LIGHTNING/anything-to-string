import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { getIndentString } from "../utils"
import { AnythingRule } from "./anything"
import { LesserObjectRule, MajorObjectRule, MaximumObjectRule } from "./object"

function isSet(data: unknown): data is Set<unknown> {
    return typeof Set != "undefined" && data instanceof Set
}

export class MinimumSetRule implements Rule<Set<unknown>> {

    public test: typeof isSet = isSet

    public toString(
        this: this,
        data: Set<unknown>,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `Set(${data.size})`
    }
}

export class LesserSetRule implements Rule<Set<unknown>> {

    public test: typeof isSet = isSet

    public prepare(
        this: this,
        data: Set<unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new LesserObjectRule().prepare(data, config, context)
        for (const value of data.values()) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: Set<unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new LesserObjectRule({
            specialValue: {
                "[[Values]]": data.size == 0 ? "None" : Array.from(data).map((value: unknown): string => {
                    return `${new AnythingRule().toString(value, config, context)}`
                        .split("\n")
                        .join(`\n${getIndentString(config)}`)
                }).map((line: string, index: number): string =>
                    `\n${getIndentString(config)}${index}: ${line}`
                ).join("")
            }
        }).toString(data, config, context)
    }
}

export class MajorSetRule implements Rule<Set<unknown>> {

    public test: typeof isSet = isSet

    public prepare(
        this: this,
        data: Set<unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule().prepare(data, config, context)
        for (const value of data.values()) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: Set<unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new MajorObjectRule({
            specialValue: {
                "[[Values]]": data.size == 0 ? "None" : Array.from(data).map((value: unknown): string => {
                    return `${new AnythingRule().toString(value, config, context)}`
                        .split("\n")
                        .join(`\n${getIndentString(config)}`)
                }).map((line: string, index: number): string =>
                    `\n${getIndentString(config)}${index}: ${line}`
                ).join("")
            }
        }).toString(data, config, context)
    }
}

export class MaximumSetRule implements Rule<Set<unknown>> {

    public test: typeof isSet = isSet

    public prepare(
        this: this,
        data: Set<unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
        for (const value of data.values()) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: Set<unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new MaximumObjectRule({
            specialValue: {
                "[[Values]]": data.size == 0 ? "None" : Array.from(data).map((value: unknown): string => {
                    return `${new AnythingRule().toString(value, config, context)}`
                        .split("\n")
                        .join(`\n${getIndentString(config)}`)
                }).map((line: string, index: number): string =>
                    `\n${getIndentString(config)}${index}: ${line}`
                ).join("")
            }
        }).toString(data, config, context)
    }
}
