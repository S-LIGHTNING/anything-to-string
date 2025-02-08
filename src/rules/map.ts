import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { getIndentString } from "../utils"
import { AnythingRule } from "./anything"
import { LesserObjectRule, MajorObjectRule, MaximumObjectRule } from "./object"

function isMap(data: unknown): data is Map<unknown, unknown> {
    return typeof Map != "undefined" && data instanceof Map
}

export class MinimumMapRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Map<unknown, unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isMap = isMap

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Map<unknown, unknown>,
        __config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return `Map(${data.size})`
    }
}

export class LesserMapRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Map<unknown, unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isMap = isMap

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Map<unknown, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        new LesserObjectRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().prepare.call(
            this, data as unknown as Record<PropertyKey, unknown>, config
        )
        for (const value of data.values()) {
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

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Map<unknown, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return new LesserObjectRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().toString.call(
            this,
            data as unknown as Record<PropertyKey, unknown>,
            config,
            {
                "[[Entries]]": data.size == 0 ? "None" : Array.from(data.entries().map(
                    ([key, value]: [unknown, unknown]): string => {
                        return `${new AnythingRule<
                                CUSTOM_CONFIG_TYPE,
                                CUSTOM_PREPARE_DATA_TYPE,
                                CUSTOM_PREPARE_CONTEXT_TYPE,
                                CUSTOM_TO_STRING_CONTEXT_TYPE
                            >().toString.call(this, key, config)
                            }: ${new AnythingRule<
                                CUSTOM_CONFIG_TYPE,
                                CUSTOM_PREPARE_DATA_TYPE,
                                CUSTOM_PREPARE_CONTEXT_TYPE,
                                CUSTOM_TO_STRING_CONTEXT_TYPE
                            >().toString.call(this, value, config)}`
                            .split("\n")
                            .join(`\n${getIndentString(config)}`)
                    }
                ).map((line: string): string =>
                    `\n${getIndentString(config)}${line}`
                )).join("")
            }
        )
    }
}

export class MajorMapRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Map<unknown, unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isMap = isMap

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Map<unknown, unknown>,
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
        for (const value of data.values()) {
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

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Map<unknown, unknown>,
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
        >().toString.call(
            this,
            data as unknown as Record<PropertyKey, unknown>,
            config,
            {
                "[[Entries]]": data.size == 0 ? "None" : Array.from(data.entries().map(
                    ([key, value]: [unknown, unknown]): string => {
                        return `${
                            "\n"}key: ${new AnythingRule<
                                CUSTOM_CONFIG_TYPE,
                                CUSTOM_PREPARE_DATA_TYPE,
                                CUSTOM_PREPARE_CONTEXT_TYPE,
                                CUSTOM_TO_STRING_CONTEXT_TYPE
                            >().toString.call(this, key, config)}${
                            "\n"}value: ${new AnythingRule<
                                CUSTOM_CONFIG_TYPE,
                                CUSTOM_PREPARE_DATA_TYPE,
                                CUSTOM_PREPARE_CONTEXT_TYPE,
                                CUSTOM_TO_STRING_CONTEXT_TYPE
                            >().toString.call(this, value, config)}`
                            .split("\n")
                            .join(`\n${getIndentString(config).repeat(2)}`)
                    }
                ).map((line: string, index: number): string =>
                    `\n${getIndentString(config)}${index}: ${line}`
                )).join("")
            }
        )
    }
}

export class MaximumMapRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Map<unknown, unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isMap = isMap

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Map<unknown, unknown>,
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
        for (const value of data.values()) {
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

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Map<unknown, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return new MaximumObjectRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().toString.call(
            this,
            data as unknown as Record<PropertyKey, unknown>,
            config,
            {
                "[[Entries]]": data.size == 0 ? "None" : Array.from(data.entries().map(
                    ([key, value]: [unknown, unknown]): string => {
                        return `${
                            "\n"}key: ${new AnythingRule<
                                CUSTOM_CONFIG_TYPE,
                                CUSTOM_PREPARE_DATA_TYPE,
                                CUSTOM_PREPARE_CONTEXT_TYPE,
                                CUSTOM_TO_STRING_CONTEXT_TYPE
                            >().toString.call(this, key, config)}${
                            "\n"}value: ${new AnythingRule<
                                CUSTOM_CONFIG_TYPE,
                                CUSTOM_PREPARE_DATA_TYPE,
                                CUSTOM_PREPARE_CONTEXT_TYPE,
                                CUSTOM_TO_STRING_CONTEXT_TYPE
                            >().toString.call(this, value, config)}`
                            .split("\n")
                            .join(`\n${getIndentString(config).repeat(2)}`)
                    }
                ).map((line: string, index: number): string =>
                    `\n${getIndentString(config)}${index}: ${line}`
                )).join("")
            }
        )
    }
}
