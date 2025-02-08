import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MINIMUM } from "."

export class AnythingRule<
    CUSTOM_CONFIG_TYPE extends {} = {},
    CUSTOM_PREPARE_DATA_TYPE extends {} = {},
    CUSTOM_PREPARE_CONTEXT_TYPE extends {} = {},
    CUSTOM_TO_STRING_CONTEXT_TYPE extends {} = {}
> implements Rule<
    unknown,
    CUSTOM_CONFIG_TYPE,
    CUSTOM_PREPARE_DATA_TYPE,
    CUSTOM_PREPARE_CONTEXT_TYPE,
    CUSTOM_TO_STRING_CONTEXT_TYPE
> {

    public test(__data: unknown): __data is unknown {
        return true
    }

    public prepare(
        this: PrepareContext<CUSTOM_PREPARE_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: unknown,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): void {
        const refCount: number | undefined = this.prepareData.refMap.get(data)
        if (refCount != undefined) {
            return
        }
        if (this.accessedSet.has(data)) {
            if (
                data != null && typeof data == "object" &&
                (config.ref || this.pathArray.includes(data))
            ) {
                this.prepareData.refMap.set(data, this.prepareData.refMap.size + 1)
                return
            }
        }
        this.accessedSet.add(data)
        this.pathArray.push(data)
        if (config.depth <= 0 || this.pathArray.length <= config.depth) {
            let rules
            if (typeof config.rules == "function") {
                rules = config.rules.call(this, data, config)
            } else {
                rules = config.rules
            }
            for (const role of rules) {
                if (role.test(data)) {
                    role.prepare?.call(this, data, config)
                    break
                }
            }
        }
        this.pathArray.pop()
    }

    public toString(
        this: ToStringContext<CUSTOM_TO_STRING_CONTEXT_TYPE, CUSTOM_PREPARE_DATA_TYPE>,
        data: unknown,
        config: RequiredConfig<
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        >
    ): string {
        let result: string = ""
        const refCount: number | undefined = this.prepareData.refMap.get(data)
        if (refCount != undefined) {
            if (this.accessedRefSet.has(data)) {
                return `[Circular *${refCount}]`
            } else {
                this.accessedRefSet.add(data)
                result += `<ref *${refCount}> `
            }
        }
        this.depth++
        let rules
        if (config.depth <=0 || this.depth <= config.depth) {
            if (typeof config.rules == "function") {
                rules = config.rules.call(this, data, config)
            } else {
                rules = config.rules
            }
        } else {
            rules = MINIMUM
        }
        const role: Rule<
            unknown,
            CUSTOM_CONFIG_TYPE,
            CUSTOM_PREPARE_DATA_TYPE,
            CUSTOM_PREPARE_CONTEXT_TYPE,
            CUSTOM_TO_STRING_CONTEXT_TYPE
        > | Rule<unknown> | undefined = rules.find(
            (role: Rule<
                unknown,
                CUSTOM_CONFIG_TYPE,
                CUSTOM_PREPARE_DATA_TYPE,
                CUSTOM_PREPARE_CONTEXT_TYPE,
                CUSTOM_TO_STRING_CONTEXT_TYPE
            > | Rule<unknown>): boolean => role.test(data)
        )
        if (role == undefined) {
            result += `[unknown type: ${typeof data} ${Object.prototype.toString.call(data)}]`
        } else {
            // @ts-ignore
            result += role.toString.call(this, data, config)
        }
        this.depth--
        return result
    }
}
