import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MajorObjectRule, MaximumObjectRule } from "./object"

function isRegExp(data: unknown): data is RegExp {
    return typeof RegExp != "undefined" && data instanceof RegExp
}

export class MinimumRegExpRule implements Rule<RegExp> {

    public test: typeof isRegExp = isRegExp

    public toString(
        this: this,
        data: RegExp,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class LesserRegExpRule implements Rule<RegExp> {

    public test: typeof isRegExp = isRegExp

    public toString(
        this: this,
        data: RegExp,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `RegExp(${String(data)})`
    }
}

export class MajorRegExpRule implements Rule<RegExp> {

    public test: typeof isRegExp = isRegExp

    public prepare(
        this: this,
        data: RegExp,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: RegExp,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `RegExp(${String(data)}) ${
            new MajorObjectRule().toString(data, config, context)
        }`
    }
}

export class MaximumRegExpRule implements Rule<RegExp> {

    public test: typeof isRegExp = isRegExp

    public prepare(
        this: this,
        data: RegExp,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: RegExp,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `RegExp(${String(data)}) ${
            new MaximumObjectRule().toString(data, config, context)
        }`
    }
}
