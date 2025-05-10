import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MajorObjectRule, MaximumObjectRule } from "./object"

function isNumber(data: unknown): data is Number {
    return typeof data == "object" && data instanceof Number
}

export class MinimumNumberRule implements Rule<Number> {

    public test: typeof isNumber = isNumber

    public toString(
        this: this,
        data: Number,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class LesserNumberRule implements Rule<Number> {

    public test: typeof isNumber = isNumber

    public toString(
        this: this,
        data: Number,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `Number(${String(data)})`
    }
}

export class MajorNumberRule implements Rule<Number> {

    public test: typeof isNumber = isNumber

    public prepare(
        this: this,
        data: Number,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Number,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `Number(${String(data)}) ${
            new MajorObjectRule().toString(data, config, context)
        }`
    }
}

export class MaximumNumberRule implements Rule<Number> {

    public test: typeof isNumber = isNumber

    public prepare(
        this: this,
        data: Number,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Number,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `Number(${String(data)}) ${
            new MaximumObjectRule().toString(data, config, context)
        }`
    }
}
