import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { getIndentString } from "../utils"
import { AnythingRule } from "./anything"

function isObject(data: unknown): data is Record<PropertyKey, unknown> {
    return typeof data == "object"
}

function objectPrepare<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
>(
    this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
    data: Record<PropertyKey, unknown>,
    config: RequiredConfig<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >,
    objectConfig: Required<RequiredConfig["object"]>
): void {
    let keys: PropertyKey[] = []
    keys.push(...Object.getOwnPropertyNames(data))
    if (objectConfig.symbol) {
        keys.push(...Object.getOwnPropertySymbols(data))
    }
    if (!objectConfig.unenumerable) {
        keys = keys.filter((key: PropertyKey): boolean => {
            return Object.getOwnPropertyDescriptor(data, key)?.enumerable ?? false
        })
    }
    for (const key of keys) {
        const property: PropertyDescriptor | undefined =
            Object.getOwnPropertyDescriptor(data, key)
        if (
            objectConfig.get ||
            (property != undefined && "value" in property)
        ) {
            propertyPrepare.call<
                PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                    Record<PropertyKey, unknown>,
                    PropertyKey,
                    RequiredConfig<
                        CUSTOM_CONFIG_TYPE,
                        CUSTOM_PREPARE_DATA_TYPE,
                        CUSTOM_PREPARE_CONTEXT_TYPE,
                        CUSTOM_TO_STRING_CONTEXT_TYPE
                    >
                ], void
            >(this, data, key, config)
        }
    }
    for (const key of keys) {
        const property: PropertyDescriptor | undefined =
            Object.getOwnPropertyDescriptor(data, key)
        if (objectConfig.getter && property?.get != undefined) {
            new AnythingRule<
                CUSTOM_CONFIG_TYPE,
                CUSTOM_PREPARE_DATA_TYPE,
                CUSTOM_PREPARE_CONTEXT_TYPE,
                CUSTOM_TO_STRING_CONTEXT_TYPE
            >().prepare.call(this, property.get, config)
        }
        if (objectConfig.setter && property?.set != undefined) {
            new AnythingRule<
                CUSTOM_CONFIG_TYPE,
                CUSTOM_PREPARE_DATA_TYPE,
                CUSTOM_PREPARE_CONTEXT_TYPE,
                CUSTOM_TO_STRING_CONTEXT_TYPE
            >().prepare.call(this, property.set, config)
        }
    }
    if (objectConfig.prototype) {
        new AnythingRule<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >().prepare.call(this, Object.getPrototypeOf(data), config)
    }
}

function objectToString<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
>(
    this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
    data: Record<PropertyKey, unknown>,
    config: RequiredConfig<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >,
    specialValue: Record<string, string> = {},
    objectConfig: Required<RequiredConfig["object"]>
): string {
    let result: string = Object.getPrototypeOf(data)?.constructor?.name ?? "Object"
    result += " {\n"
    let keys: PropertyKey[] = []
    keys.push(...Object.getOwnPropertyNames(data))
    if (objectConfig.symbol) {
        keys.push(...Object.getOwnPropertySymbols(data))
    }
    if (!objectConfig.unenumerable) {
        keys = keys.filter((key: PropertyKey): boolean => {
            return Object.getOwnPropertyDescriptor(data, key)?.enumerable ?? false
        })
    }
    for (const key of keys) {
        const keyDescription: string = typeof key == "string" ? key : `[${String(key)}]`
        const property: PropertyDescriptor | undefined =
            Object.getOwnPropertyDescriptor(data, key)
        if (
            objectConfig.get ||
            (property != undefined && "value" in property)
        ) {
            result += `${keyDescription}: ${propertyToString.call<
                    ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                        Record<PropertyKey, unknown>,
                        PropertyKey,
                        RequiredConfig<
                            CUSTOM_CONFIG_TYPE,
                            CUSTOM_PREPARE_DATA_TYPE,
                            CUSTOM_PREPARE_CONTEXT_TYPE,
                            CUSTOM_TO_STRING_CONTEXT_TYPE
                        >
                    ], void
                >(this, data, key, config)}`
                .split("\n")
                .map((line: string): string => `${getIndentString(config)}${line}`)
                .join("\n")
                 + "\n"
        }
    }
    for (const key of keys) {
        const keyDescription: string = typeof key == "string" ? key : `[${String(key)}]`
        const property: PropertyDescriptor | undefined =
            Object.getOwnPropertyDescriptor(data, key)
        if (objectConfig.getter && property?.get != undefined) {
            result += `get ${keyDescription}: ${
                new AnythingRule<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >().toString.call(this, property.get, config)
            }`
                .split("\n")
                .map((line: string): string => `${getIndentString(config)}${line}`)
                .join("\n")
                + "\n"
        }
        if (objectConfig.setter && property?.set != undefined) {
            result += `set ${keyDescription}: ${
                new AnythingRule<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >().toString.call(this, property.set, config)
            }`
                .split("\n")
                .map((line: string): string => `${getIndentString(config)}${line}`)
                .join("\n")
                + "\n"
        }
    }
    if (objectConfig.prototype) {
        specialValue["[[Prototype]]"] =
            new AnythingRule<
                CUSTOM_CONFIG_TYPE,
                CUSTOM_PREPARE_DATA_TYPE,
                CUSTOM_PREPARE_CONTEXT_TYPE,
                CUSTOM_TO_STRING_CONTEXT_TYPE
            >().toString.call(this, Object.getPrototypeOf(data), config)
    }
    for (const [key, value] of Object.entries(specialValue)) {
        result += `${key}: ${value}`
            .split("\n")
            .map((line: string): string => `${getIndentString(config)}${line}`)
            .join("\n")
            + "\n"
    }
    result += "}"
    if (keys.length == 0 && Object.keys(specialValue).length == 0) {
        return "{}"
    }
    return result
}

export class MinimumObjectRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    Record<PropertyKey, unknown>,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test: typeof isObject = isObject

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Record<PropertyKey, unknown>,
        __config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        return Object.prototype.toString.call(data)
    }
}

export class LesserObjectRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    object,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    private static readonly defaultConfig: Required<RequiredConfig["object"]> = {
        unenumerable: false,
        symbol: false,
        get: false,
        getter: false,
        setter: false,
        prototype: false
    }

    public test: typeof isObject = isObject

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Record<PropertyKey, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        objectPrepare.call<
            PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                Record<PropertyKey, unknown>,
                RequiredConfig<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >,
                Required<RequiredConfig["object"]>
            ], void
        >(
            this,
            data,
            config,
            Object.assign({}, LesserObjectRule.defaultConfig, config.object)
        )
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Record<PropertyKey, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >,
        specialValue: Record<string, string> = {}
    ): string {
        return objectToString.call<
            ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                Record<PropertyKey, unknown>,
                RequiredConfig<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >,
                Record<string, string>,
                Required<RequiredConfig["object"]>
            ], string
        >(
            this,
            data,
            config,
            specialValue,
            Object.assign({}, LesserObjectRule.defaultConfig, config.object)
        )
    }
}

export class MajorObjectRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    object,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    private static readonly defaultConfig: Required<RequiredConfig["object"]> = {
        unenumerable: true,
        symbol: true,
        get: true,
        getter: false,
        setter: false,
        prototype: false
    }

    public test: typeof isObject = isObject

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Record<PropertyKey, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        objectPrepare.call<
            PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                Record<PropertyKey, unknown>,
                RequiredConfig<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >,
                Required<RequiredConfig["object"]>
            ], void
        >(
            this,
            data,
            config,
            Object.assign({}, MajorObjectRule.defaultConfig, config.object)
        )
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Record<PropertyKey, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >,
        specialValue: Record<string, string> = {}
    ): string {
        return objectToString.call<
            ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                Record<PropertyKey, unknown>,
                RequiredConfig<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >,
                Record<string, string>,
                Required<RequiredConfig["object"]>
            ], string
        >(
            this,
            data,
            config,
            specialValue,
            Object.assign({}, MajorObjectRule.defaultConfig, config.object)
        )
    }
}

export class MaximumObjectRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    object,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    private static readonly defaultConfig: Required<RequiredConfig["object"]> = {
        unenumerable: true,
        symbol: true,
        get: true,
        getter: true,
        setter: true,
        prototype: true
    }

    public test: typeof isObject = isObject

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Record<PropertyKey, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        objectPrepare.call<
            PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                Record<PropertyKey, unknown>,
                RequiredConfig<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >,
                Required<RequiredConfig["object"]>
            ], void
        >(
            this,
            data,
            config,
            Object.assign({}, MaximumObjectRule.defaultConfig, config.object)
        )
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: Record<PropertyKey, unknown>,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >,
        specialValue: Record<string, string> = {}
    ): string {
        return objectToString.call<
            ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>, [
                Record<PropertyKey, unknown>,
                RequiredConfig<
                    CUSTOM_CONFIG_TYPE,
                    CUSTOM_PREPARE_DATA_TYPE,
                    CUSTOM_PREPARE_CONTEXT_TYPE,
                    CUSTOM_TO_STRING_CONTEXT_TYPE
                >,
                Record<string, string>,
                Required<RequiredConfig["object"]>
            ], string
        >(
            this,
            data,
            config,
            specialValue,
            Object.assign({}, MaximumObjectRule.defaultConfig, config.object)
        )
    }
}

function propertyPrepare<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
>(
    this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
    object: Record<PropertyKey, unknown>,
    key: PropertyKey,
    config: RequiredConfig<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >
): void {
    let value: unknown
    try {
        value = object[key]
    } catch (error) {
        value = error
    }
    new AnythingRule<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >().prepare.call(this, value, config)
}

function propertyToString<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
>(
    this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
    object: Record<PropertyKey, unknown>,
    key: PropertyKey,
    config: RequiredConfig<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >
): unknown {
    let hasError: boolean = false
    let value
    try {
        value = object[key]
    } catch (error) {
        hasError = true
        value = error
    }
    const result: string = new AnythingRule<
        CUSTOM_CONFIG_TYPE,
        CUSTOM_PREPARE_DATA_TYPE,
        CUSTOM_PREPARE_CONTEXT_TYPE,
        CUSTOM_TO_STRING_CONTEXT_TYPE
    >().toString.call(this, value, config)
    if (hasError) {
        return `[Exception: ${result}]`
    } else {
        return result
    }
}
