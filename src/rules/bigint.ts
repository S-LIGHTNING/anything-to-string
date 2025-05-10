import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isBigInt(data: unknown): data is bigint {
    return typeof data == "bigint"
}

export class MinimumBigIntRule implements Rule<bigint> {

    public test: typeof isBigInt = isBigInt

    public toString(
        this: this,
        data: bigint,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class LesserBigIntRule implements Rule<bigint> {

    public test: typeof isBigInt = isBigInt

    public toString(
        this: this,
        data: bigint,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class MajorBigIntRule implements Rule<bigint> {

    public test: typeof isBigInt = isBigInt

    public toString(
        this: this,
        data: bigint,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `[bigint: ${String(data)}]`
    }
}

export class MaximumBigIntRule implements Rule<bigint> {

    public test: typeof isBigInt = isBigInt

    public prepare(
        this: this,
        data: bigint,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: bigint,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `[bigint: ${String(data)}] ${
            new MaximumObjectRule().toString(data, config, context)
        }`
    }
}
