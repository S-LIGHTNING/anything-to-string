import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isSymbol(data: unknown): data is symbol {
    return typeof data == "symbol"
}

export class MinimumSymbolRule implements Rule<symbol> {

    public test: typeof isSymbol = isSymbol

    public toString(
        this: this,
        data: symbol,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class LesserSymbolRule implements Rule<symbol> {

    public test: typeof isSymbol = isSymbol

    public toString(
        this: this,
        data: symbol,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class MajorSymbolRule implements Rule<symbol> {

    public test: typeof isSymbol = isSymbol

    public toString(
        this: this,
        data: symbol,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return String(data)
    }
}

export class MaximumSymbolRule implements Rule<symbol> {

    public test: typeof isSymbol = isSymbol

    public prepare(
        this: this,
        data: symbol,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: symbol,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return `${String(data)} ${
            new MaximumObjectRule().toString(data, config, context)
        }`
    }
}
