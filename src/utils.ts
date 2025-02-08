import { RequiredConfig } from "./config"

export function getIndentString<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
>(
    config: RequiredConfig<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >
): string {
    const { indent } = config
    if (typeof indent == "number") {
        return " ".repeat(indent)
    } else {
        return indent
    }
}
