import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isBasicNumber(data: unknown): data is number {
    return typeof data == "number"
}

export class MinimumBasicNumberRule implements Rule<number> {

    public test: typeof isBasicNumber = isBasicNumber

    public toString(
        this: this,
        data: number,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class LesserBasicNumberRule implements Rule<number> {

    public test: typeof isBasicNumber = isBasicNumber

    public toString(
        this: this,
        data: number,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class MajorBasicNumberRule implements Rule<number> {

    public test: typeof isBasicNumber = isBasicNumber

    public toString(
        this: this,
        data: number,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `[number: ${String(data)}]`
    }
}

export class MaximumBasicNumberRule implements Rule<number> {

    public test: typeof isBasicNumber = isBasicNumber

    public prepare(
        this: this,
        data: number,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: number,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `[number: ${String(data)}] ${
            new MaximumObjectRule().toString(data, config, context)
        }`
    }
}
