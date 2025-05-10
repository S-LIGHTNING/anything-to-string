import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { getIndentString } from "../utils"
import { AnythingRule } from "./anything"
import { LesserObjectRule, MajorObjectRule, MaximumObjectRule } from "./object"

function isMap(data: unknown): data is Map<unknown, unknown> {
    return typeof Map != "undefined" && data instanceof Map
}

export class MinimumMapRule implements Rule<Map<unknown, unknown>> {

    public test: typeof isMap = isMap

    public toString(
        this: this,
        data: Map<unknown, unknown>,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `Map(${data.size})`
    }
}

export class LesserMapRule implements Rule<Map<unknown, unknown>> {

    public test: typeof isMap = isMap

    public prepare(
        this: this,
        data: Map<unknown, unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new LesserObjectRule().prepare(data, config, context)
        for (const key of data.keys()) {
            new AnythingRule().prepare(key, config, context)
        }
        for (const value of data.values()) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: Map<unknown, unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new LesserObjectRule({
            specialValue: {
                "[[Entries]]": data.size == 0 ? "None" : Array.from(data.entries().map(
                    ([key, value]: [unknown, unknown]): string => {
                        return `${new AnythingRule().toString(key, config, context)
                            }: ${new AnythingRule().toString(value, config, context)}`
                            .split("\n")
                            .join(`\n${getIndentString(config)}`)
                    }
                ).map((line: string): string =>
                    `\n${getIndentString(config)}${line}`
                )).join("")
            }
        }).toString(data, config, context)
    }
}

export class MajorMapRule implements Rule<Map<unknown, unknown>> {

    public test: typeof isMap = isMap

    public prepare(
        this: this,
        data: Map<unknown, unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule().prepare(data, config, context)
        for (const key of data.keys()) {
            new AnythingRule().prepare(key, config, context)
        }
        for (const value of data.values()) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: Map<unknown, unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new MajorObjectRule({
            specialValue: {
                "[[Entries]]": data.size == 0 ? "None" : Array.from(data.entries().map(
                    ([key, value]: [unknown, unknown]): string => {
                        return `${
                            "\n"}key: ${new AnythingRule().toString(key, config, context)}${
                            "\n"}value: ${new AnythingRule().toString(value, config, context)}`
                            .split("\n")
                            .join(`\n${getIndentString(config).repeat(2)}`)
                    }
                ).map((line: string, index: number): string =>
                    `\n${getIndentString(config)}${index}: ${line}`
                )).join("")
            }
        }).toString(data, config, context)
    }
}

export class MaximumMapRule implements Rule<Map<unknown, unknown>> {

    public test: typeof isMap = isMap

    public prepare(
        this: this,
        data: Map<unknown, unknown>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
        for (const key of data.keys()) {
            new AnythingRule().prepare(key, config, context)
        }
        for (const value of data.values()) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: Map<unknown, unknown>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return new MaximumObjectRule({
            specialValue: {
                "[[Entries]]": data.size == 0 ? "None" : Array.from(data.entries().map(
                    ([key, value]: [unknown, unknown]): string => {
                        return `${
                            "\n"}key: ${new AnythingRule().toString(key, config, context)}${
                            "\n"}value: ${new AnythingRule().toString(value, config, context)}`
                            .split("\n")
                            .join(`\n${getIndentString(config).repeat(2)}`)
                    }
                ).map((line: string, index: number): string =>
                    `\n${getIndentString(config)}${index}: ${line}`
                )).join("")
            }
        }).toString(data, config, context)
    }
}
