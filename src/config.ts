export interface PrepareData {
    refMap: Map<unknown, number>
}

export interface PrepareContext {
    pathArray: unknown[]
    accessedSet: Set<unknown>
    prepareData: PrepareData
}

export interface ToStringContext {
    depth: number
    accessedRefSet: Set<unknown>
    prepareData: PrepareData
}

export interface Rule<DATA_TYPE> {
    test(data: unknown): data is DATA_TYPE
    prepare?(
        this: this,
        data: DATA_TYPE,
        config: RequiredConfig,
        context: PrepareContext
    ): void
    toString(
        this: this,
        data: DATA_TYPE,
        config: RequiredConfig,
        context: ToStringContext
    ): string
}

export interface BasicConfig {
    rules?: Rule<unknown>[] | ((
        data: unknown,
        config: RequiredConfig,
        context: PrepareContext | ToStringContext
    ) => Rule<unknown>[])
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
        exclude?: PropertyKey[] | Set<PropertyKey> | ((key: PropertyKey) => boolean)
    }
}

export interface Config extends BasicConfig {}

export type RequiredConfig = Required<BasicConfig> & Config
