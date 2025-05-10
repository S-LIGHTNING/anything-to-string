import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { getIndentString } from "../utils"
import { AnythingRule } from "./anything"

function exclude(exclude: RequiredConfig["object"]["exclude"], key: PropertyKey): boolean {
    if (Array.isArray(exclude)) {
        return exclude.includes(key)
    } else if (typeof Set != undefined && exclude instanceof Set) {
        return exclude.has(key)
    } else if (typeof exclude == "function") {
        return exclude(key)
    } else {
        return false
    }
}

export class ObjectRule implements Rule<{}> {

    public defaultConfig: Required<RequiredConfig["object"]>
    public specialValue: Record<string, string>

    public constructor({
        defaultConfig, specialValue = {}
    }: {
        defaultConfig: Required<RequiredConfig["object"]>
        specialValue?: Record<string, string>
    }) {
        this.defaultConfig = defaultConfig
        this.specialValue = specialValue
    }

    public test(data: unknown): data is {} {
        return typeof data == "object"
    }

    public prepare(
        this: this,
        data: {},
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        const objectConfig: Required<RequiredConfig["object"]> = Object.assign(
            {}, this.defaultConfig, config.object
        )
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
        keys = keys.filter((key: PropertyKey): boolean => !exclude(objectConfig.exclude, key))
        for (const key of keys) {
            const property: PropertyDescriptor | undefined =
                Object.getOwnPropertyDescriptor(data, key)
            if (
                objectConfig.get ||
                (property != undefined && "value" in property)
            ) {
                let value: unknown
                try {
                    value = data[key as keyof typeof data]
                } catch (error) {
                    value = error
                }
                new AnythingRule().prepare(value, config, context)
            }
        }
        for (const key of keys) {
            const property: PropertyDescriptor | undefined =
                Object.getOwnPropertyDescriptor(data, key)
            if (objectConfig.getter && property?.get != undefined) {
                new AnythingRule().prepare(property.get, config, context)
            }
            if (objectConfig.setter && property?.set != undefined) {
                new AnythingRule().prepare(property.set, config, context)
            }
        }
        if (objectConfig.prototype) {
            new AnythingRule().prepare(Object.getPrototypeOf(data), config, context)
        }
    }

    toString(
        this: this,
        data: {},
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        const objectConfig: Required<RequiredConfig["object"]> = Object.assign(
            {}, this.defaultConfig, config.object
        )
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
        keys = keys.filter((key: PropertyKey): boolean => !exclude(objectConfig.exclude, key))
        for (const key of keys) {
            const keyDescription: string = typeof key == "string" ? key : `[${String(key)}]`
            const property: PropertyDescriptor | undefined =
                Object.getOwnPropertyDescriptor(data, key)
            if (
                objectConfig.get ||
                (property != undefined && "value" in property)
            ) {
                result += `${keyDescription}: ${this.propertyToString(data, key, config, context)}`
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
                    new AnythingRule().toString(property.get, config, context)
                }`
                    .split("\n")
                    .map((line: string): string => `${getIndentString(config)}${line}`)
                    .join("\n")
                    + "\n"
            }
            if (objectConfig.setter && property?.set != undefined) {
                result += `set ${keyDescription}: ${
                    new AnythingRule().toString(property.set, config, context)
                }`
                    .split("\n")
                    .map((line: string): string => `${getIndentString(config)}${line}`)
                    .join("\n")
                    + "\n"
            }
        }
        if (objectConfig.prototype) {
            this.specialValue["[[Prototype]]"] =
                new AnythingRule().toString(Object.getPrototypeOf(data), config, context)
        }
        for (const [key, value] of Object.entries(this.specialValue)) {
            result += `${key}: ${value}`
                .split("\n")
                .map((line: string): string => `${getIndentString(config)}${line}`)
                .join("\n")
                + "\n"
        }
        result += "}"
        if (keys.length == 0 && Object.keys(this.specialValue).length == 0) {
            return "{}"
        }
        return result
    }

    propertyToString(
        this: this,
        object: Record<PropertyKey, unknown>,
        key: PropertyKey,
        config: RequiredConfig,
        context: ToStringContext
    ): unknown {
        let hasError: boolean = false
        let value
        try {
            value = object[key]
        } catch (error) {
            hasError = true
            value = error
        }
        const result: string = new AnythingRule().toString(value, config, context)
        if (hasError) {
            return `[Exception: ${result}]`
        } else {
            return result
        }
    }
}

export class MinimumObjectRule implements Rule<{}> {

    public test: typeof ObjectRule.prototype.test = ObjectRule.prototype.test

    public toString(
        this: this,
        data: Record<PropertyKey, unknown>,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return Object.prototype.toString.call(data)
    }
}

export class LesserObjectRule extends ObjectRule {
    public constructor({
        defaultConfig = {}, specialValue = {}
    }: {
        defaultConfig?: RequiredConfig["object"]
        specialValue?: Record<string, string>
    } = {}) {
        super({
            defaultConfig: Object.assign({
                unenumerable: false,
                symbol: false,
                get: false,
                getter: false,
                setter: false,
                prototype: false,
                exclude: []
            }, defaultConfig),
            specialValue
        })
    }
}

export class MajorObjectRule extends ObjectRule {
    public constructor({
        defaultConfig = {}, specialValue = {}
    }: {
        defaultConfig?: RequiredConfig["object"]
        specialValue?: Record<string, string>
    } = {}) {
        super({
            defaultConfig: Object.assign({
                unenumerable: true,
                symbol: true,
                get: true,
                getter: false,
                setter: false,
                prototype: false,
                exclude: []
            }, defaultConfig),
            specialValue
        })
    }
}

export class MaximumObjectRule extends ObjectRule {
    public constructor({
        defaultConfig = {}, specialValue = {}
    }: {
        defaultConfig?: RequiredConfig["object"]
        specialValue?: Record<string, string>
    } = {}) {
        super({
            defaultConfig: Object.assign({
                unenumerable: true,
                symbol: true,
                get: true,
                getter: true,
                setter: true,
                prototype: true,
                exclude: []
            }, defaultConfig),
            specialValue
        })
    }
}
