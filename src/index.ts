import { Config, PrepareContext, RequiredConfig, Rule, ToStringContext } from "./config"
import * as Rules from "./rules"
import { AnythingRule } from "./rules/anything"

export * from "./utils"
export * from "./config"
export * from "./rules/null"
export * from "./rules/undefined"
export * from "./rules/basic-string"
export * from "./rules/basic-number"
export * from "./rules/basic-boolean"
export * from "./rules/string"
export * from "./rules/number"
export * from "./rules/boolean"
export * from "./rules/reg-exp"
export * from "./rules/symbol"
export * from "./rules/bigint"
export * from "./rules/set"
export * from "./rules/map"
export * from "./rules/weak-ref"
export * from "./rules/error"
export * from "./rules/HTMLElement"
export * from "./rules/array"
export * from "./rules/object"
export * from "./rules/function"
export { Rules }

export function stringify(
    data: unknown,
    config: Config = {}
): string {
    const requiredConfig: RequiredConfig = Object.assign({
        rules(
            this: PrepareContext | ToStringContext,
            __data: unknown,
            __config: RequiredConfig
        ): Rule<unknown>[] {
            const depth: number = "pathArray" in this ? this.pathArray.length : this.depth
            switch (depth) {
                case 1:
                    return Rules.MAXIMUM
                case 2:
                    return Rules.MAJOR
                case 3:
                    return Rules.LESSER
                default:
                    return Rules.MINIMUM
            }
        },
        indent: 4,
        depth: 4,
        ref: false,
        object: {}
    }, config)
    const prepareData = {
        refMap: new Map<unknown, number>()
    }
    new AnythingRule().prepare.call({
        pathArray: [],
        accessedSet: new Set(),
        prepareData
    }, data, requiredConfig)
    return new AnythingRule().toString.call({
        depth: 0,
        accessedRefSet: new Set<unknown>(),
        prepareData
    }, data, requiredConfig)
}

export default stringify
