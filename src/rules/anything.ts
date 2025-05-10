import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MINIMUM } from "."

export class AnythingRule implements Rule<unknown> {

    public test(__data: unknown): __data is unknown {
        return true
    }

    public prepare(
        this: this,
        data: unknown,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        const refCount: number | undefined = context.prepareData.refMap.get(data)
        if (refCount != undefined) {
            return
        }
        if (context.accessedSet.has(data)) {
            if (
                data != null && typeof data == "object" &&
                (config.ref || context.pathArray.includes(data))
            ) {
                context.prepareData.refMap.set(data, context.prepareData.refMap.size + 1)
                return
            }
        }
        context.accessedSet.add(data)
        context.pathArray.push(data)
        if (config.depth <= 0 || context.pathArray.length <= config.depth) {
            let rules
            if (typeof config.rules == "function") {
                rules = config.rules(data, config, context)
            } else {
                rules = config.rules
            }
            for (const role of rules) {
                if (role.test(data)) {
                    role.prepare?.(data, config, context)
                    break
                }
            }
        }
        context.pathArray.pop()
    }

    public toString(
        this: this,
        data: unknown,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        let result: string = ""
        const refCount: number | undefined = context.prepareData.refMap.get(data)
        if (refCount != undefined) {
            if (context.accessedRefSet.has(data)) {
                return `[Circular *${refCount}]`
            } else {
                context.accessedRefSet.add(data)
                result += `<ref *${refCount}> `
            }
        }
        context.depth++
        let rules
        if (config.depth <=0 || context.depth <= config.depth) {
            if (typeof config.rules == "function") {
                rules = config.rules(data, config, context)
            } else {
                rules = config.rules
            }
        } else {
            rules = MINIMUM
        }
        const role: Rule<unknown> | undefined = rules.find(
            (role: Rule<unknown>): boolean => role.test(data)
        )
        if (role == undefined) {
            result += `[unknown type: ${typeof data} ${Object.prototype.toString.call(data)}]`
        } else {
            result += role.toString(data, config, context)
        }
        context.depth--
        return result
    }
}
