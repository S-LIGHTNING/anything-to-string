export type PrepareData<CUSTOM_DATA_TYPE extends {} = {}> = {
    refMap: Map<unknown, number>
} & CUSTOM_DATA_TYPE

export type PrepareContext<
    CUSTOM_CONTEXT_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {}
> = {
    pathArray: unknown[]
    accessedSet: Set<unknown>
    prepareData: PrepareData<CUSTOM_PREPARE_DATA_TYPE>
} & Partial<CUSTOM_CONTEXT_TYPE>

export type ToStringContext<
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {}
> = {
    depth: number
    accessedRefSet: Set<unknown>
    prepareData: PrepareData<CUSTOM_PREPARE_DATA_TYPE>
} & CUSTOM_TO_STRING_CONTEXT_TYPE

export interface Rule<
    DATA_TYPE,
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> {
    test(data: unknown): data is DATA_TYPE
    prepare?(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: DATA_TYPE,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void
    toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: DATA_TYPE,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string
}

export type BasicConfig<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> = {
    rules?: Rule<
        unknown,
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >[] | ((
        this:
            PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE> |
            ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: unknown,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ) => Rule<
        unknown,
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >[])
    indent?: number | string
    depth?: number
    ref?: boolean
    object?: {
        unenumerable?: boolean
        symbol?: boolean
        get?: boolean
        getter?: boolean
        setter?: boolean
        prototype?: boolean
    }
}

export type Config<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> =
    BasicConfig<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    > & CUSTOM_CONFIG_TYPE

export type RequiredConfig<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> =
    Required<BasicConfig<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >> & CUSTOM_CONFIG_TYPE
