import { RequiredConfig, Rule, ToStringContext } from "../config"

export class NullRule implements Rule<null> {

    public test(data: unknown): data is null {
        return data === null
    }

    public toString(
        this: this,
        __data: null,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return "null"
    }
}
