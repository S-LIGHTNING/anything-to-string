import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isBasicBoolean(data: unknown): data is boolean {
    return typeof data == "boolean"
}

export class MinimumBasicBooleanRule implements Rule<boolean> {

    public test: typeof isBasicBoolean = isBasicBoolean

    public toString(
        this: this,
        data: boolean,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class LesserBasicBooleanRule implements Rule<boolean> {

    public test: typeof isBasicBoolean = isBasicBoolean

    public toString(
        this: this,
        data: boolean,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class MajorBasicBooleanRule implements Rule<boolean> {

    public test: typeof isBasicBoolean = isBasicBoolean

    public toString(
        this: this,
        data: boolean,
        __config: RequiredConfig
    ): string {
        return `[boolean: ${String(data)}]`
    }
}
export class MaximumBasicBooleanRule implements Rule<boolean> {

    public test: typeof isBasicBoolean = isBasicBoolean

    public prepare(
        this: this,
        data: boolean,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: boolean,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `[boolean: ${String(data)}] ${
            new MaximumObjectRule().toString(data, config, context)
        }`
    }
}
