import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isFunction(data: unknown): data is Function {
    return typeof data == "function"
}

export class MinimumFunctionRule implements Rule<Function> {

    public test: typeof isFunction = isFunction

    public toString(
        this: this,
        data: Function,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return data.name == "" ? "[Function]" : `[Function: ${data.name}]`
    }
}

export class LesserFunctionRule implements Rule<Function> {

    public test: typeof isFunction = isFunction

    public toString(
        this: this,
        data: Function,
        __config: RequiredConfig
    ): string {
        const functionString: string = Function.prototype.toString.call(data)
            .replace(/[\s]+/g, " ")
        if (functionString.length <= 64) {
            return functionString
        }
        const marchResult: RegExpMatchArray | null = functionString.match(/^((function[\s]*[\S]+?[\s]*\([\s\S]*?\)|([\S]+?|\([\s\S]*?\))[\s]*=>|class[\s]*[\S]+?)[\s]*\{[\s]*)[\s\S]*?([\s]*\}[\s]*)$/)
        if (marchResult == null) {
            return functionString
        }
        return `${marchResult[1]}...${marchResult[4]}`
    }
}

export class MajorFunctionRule implements Rule<Function> {

    public test: typeof isFunction = isFunction

    public toString(
        this: this,
        data: Function,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return Function.prototype.toString.call(data)
    }
}

export class MaximumFunctionRule implements Rule<Function> {

    public test: typeof isFunction = isFunction

    public prepare(
        this: this,
        data: Function,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: Function,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return Function.prototype.toString.call(data) + " " +
            new MaximumObjectRule().toString(data, config, context)
    }
}
