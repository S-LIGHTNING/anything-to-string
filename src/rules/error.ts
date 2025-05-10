import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isError(data: unknown): data is Error {
    return typeof Error != "undefined" && data instanceof Error
}

export class MinimumErrorRule implements Rule<Error> {

    public test: typeof isError = isError

    public toString(
        this: this,
        data: Error,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return `[${data.name}]`
    }
}

export class LesserErrorRule implements Rule<Error> {

    public test: typeof isError = isError

    public toString(
        this: this,
        data: Error,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return Error.prototype.toString.call(data)
    }
}

export class MajorErrorRule implements Rule<Error> {

    public test: typeof isError = isError

    public toString(
        this: this,
        data: Error,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return data.stack ?? Error.prototype.toString.call(data)
    }
}

export class MaximumErrorRule implements Rule<Error> {

    public test: typeof isError = isError

    public prepare(
        this: this,
        data: Error,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Error,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `${data.stack ?? Error.prototype.toString.call(data)}${
            new MaximumObjectRule().toString(data, config, context)}`
    }
}
