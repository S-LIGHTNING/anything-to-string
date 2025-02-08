import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { getIndentString } from "../utils"
import { AnythingRule } from "./anything"
import { MajorObjectRule, MaximumObjectRule } from "./object"

export class MinimumArrayRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Array<unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof Array.isArray = Array.isArray

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Array<unknown>,
        __config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return `Array(${data.length})`
    }
}

export class LesserArrayRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Array<unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof Array.isArray = Array.isArray

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Array<unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        for (const value of data) {
            if (value != undefined) {
                new AnythingRule<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >().prepare.call(
                    this, value, config
                )
            }
        }
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Array<unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        if (data.length == 0) {
            return "[]"
        }
        let result: string = "[\n"
        result += (0 in data ? new AnythingRule<
                CUSTOM_CONFIG_TYPE,
                CUSTOM_PREPARE_DATA_TYPE,
                CUSTOM_PREPARE_CONTEXT_TYPE,
                CUSTOM_TO_STRING_CONTEXT_TYPE
            >().toString.call(
                this, data[0], config
            ) : "None").split("\n").map((line: string): string =>
                `${getIndentString(config)}${line}`
            ).join("\n")
        for (let i: number = 1; i < data.length; i++) {
            result += `,\n${(i in data ? new AnythingRule<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >().toString.call(
                    this, data[i], config
                ) : "None").split("\n").map((line: string): string =>
                    `${getIndentString(config)}${line}`
                ).join("\n")}`
        }
        result += "\n]"
        return result
    }
}

export class MajorArrayRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Array<unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof Array.isArray = Array.isArray

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Array<unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        new MajorObjectRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().prepare.call(
            this, data as unknown as Record<PropertyKey, unknown>, config
        )
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Array<unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return new MajorObjectRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().toString.call(this, data as unknown as Record<PropertyKey, unknown>, config)
    }
}

export class MaximumArrayRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Array<unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof Array.isArray = Array.isArray

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Array<unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        new MaximumObjectRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().prepare.call(
            this, data as unknown as Record<PropertyKey, unknown>, config
        )
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Array<unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return new MajorObjectRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().toString.call(this, data as unknown as Record<PropertyKey, unknown>, config)
    }
}
