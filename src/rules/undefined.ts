import { RequiredConfig, Rule, ToStringContext } from "../config"

export class UndefinedRule implements Rule<undefined> {

    public test(data: unknown): data is undefined {
        return data === undefined
    }

    public toString(
        this: this,
        __data: undefined,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return "undefined"
    }
}
