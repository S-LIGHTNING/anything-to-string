import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { AnythingRule } from "./anything"
import { LesserObjectRule, MajorObjectRule, MaximumObjectRule } from "./object"

function isWeakRef(data: unknown): data is WeakRef<WeakKey> {
    return typeof WeakRef != "undefined" && data instanceof WeakRef
}

export class MinimumWeakRefRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    WeakRef<WeakKey>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isWeakRef = isWeakRef

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        __data: WeakRef<WeakKey>,
        __config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return "[WeakRef]"
    }
}

export class LesserWeakRefRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    WeakRef<WeakKey>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isWeakRef = isWeakRef

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: WeakRef<WeakKey>,
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
        const value: WeakKey | undefined = data.deref()
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

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: WeakRef<WeakKey>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        const value: WeakKey | undefined = data.deref()
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
                "[[WeakRefTarget]]": value == undefined ? "None" : `${
                    new AnythingRule<
                        CUSTOM_CONFIG_TYPE,
                        CUSTOM_PREPARE_DATA_TYPE,
                        CUSTOM_PREPARE_CONTEXT_TYPE,
                        CUSTOM_TO_STRING_CONTEXT_TYPE
                    >().toString.call(this, value, config)}`
            }
        )
    }
}

export class MajorWeakRefRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    WeakRef<WeakKey>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isWeakRef = isWeakRef

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: WeakRef<WeakKey>,
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
        const value: WeakKey | undefined = data.deref()
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

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: WeakRef<WeakKey>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        const value: WeakKey | undefined = data.deref()
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
                "[[WeakRefTarget]]": value == undefined ? "None" : `${
                    new AnythingRule<
                        CUSTOM_CONFIG_TYPE,
                        CUSTOM_PREPARE_DATA_TYPE,
                        CUSTOM_PREPARE_CONTEXT_TYPE,
                        CUSTOM_TO_STRING_CONTEXT_TYPE
                    >().toString.call(this, value, config)}`
            }
        )
    }
}

export class MaximumWeakRefRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    WeakRef<WeakKey>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isWeakRef = isWeakRef

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: WeakRef<WeakKey>,
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
        const value: WeakKey | undefined = data.deref()
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

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: WeakRef<WeakKey>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        const value: WeakKey | undefined = data.deref()
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
                "[[WeakRefTarget]]": value == undefined ? "None" : `${
                    new AnythingRule<
                        CUSTOM_CONFIG_TYPE,
                        CUSTOM_PREPARE_DATA_TYPE,
                        CUSTOM_PREPARE_CONTEXT_TYPE,
                        CUSTOM_TO_STRING_CONTEXT_TYPE
                    >().toString.call(this, value, config)}`
            }
        )
    }
}
