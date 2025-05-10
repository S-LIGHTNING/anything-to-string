import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MajorObjectRule, MaximumObjectRule } from "./object"

function isBoolean(data: unknown): data is Boolean {
    return typeof data == "object" && data instanceof Boolean
}

export class MinimumBooleanRule implements Rule<Boolean> {

    public test: typeof isBoolean = isBoolean

    public toString(
        this: this,
        data: Boolean,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class LesserBooleanRule implements Rule<Boolean> {

    public test: typeof isBoolean = isBoolean

    public toString(
        this: this,
        data: Boolean,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `Boolean(${String(data)})`
    }
}

export class MajorBooleanRule implements Rule<Boolean> {

    public test: typeof isBoolean = isBoolean

    public prepare(
        this: this,
        data: Boolean,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Boolean,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `Boolean(${String(data)}) ${
            new MajorObjectRule().toString(data, config, context)
        }`
    }
}

export class MaximumBooleanRule implements Rule<Boolean> {

    public test: typeof isBoolean = isBoolean

    public prepare(
        this: this,
        data: Boolean,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Boolean,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `Boolean(${String(data)}) ${
            new MaximumObjectRule().toString(data, config, context)
        }`
    }
}
