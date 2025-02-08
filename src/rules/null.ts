import { RequiredConfig, Rule, ToStringContext } from "../config"

export class NullRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    null,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test(data: unknown): data is null {
        return data === null
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        __data: null,
        __config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return "null"
    }
}
