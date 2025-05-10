import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { AnythingRule } from "./anything"
import { LesserObjectRule, MajorObjectRule, MaximumObjectRule } from "./object"

function isWeakRef(data: unknown): data is WeakRef<WeakKey> {
    return typeof WeakRef != "undefined" && data instanceof WeakRef
}

export class MinimumWeakRefRule implements Rule<WeakRef<WeakKey>> {

    public test: typeof isWeakRef = isWeakRef

    public toString(
        this: this,
        __data: WeakRef<WeakKey>,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return "[WeakRef]"
    }
}

export class LesserWeakRefRule implements Rule<WeakRef<WeakKey>> {

    public test: typeof isWeakRef = isWeakRef

    public prepare(
        this: this,
        data: WeakRef<WeakKey>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new LesserObjectRule().prepare(data, config, context)
        const value: WeakKey | undefined = data.deref()
        if (value != undefined) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: WeakRef<WeakKey>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        const value: WeakKey | undefined = data.deref()
        return new LesserObjectRule({
            specialValue: {
                "[[WeakRefTarget]]": value == undefined ? "None" : `${
                    new AnythingRule().toString(value, config, context)}`
            }
        }).toString(data, config, context)
    }
}

export class MajorWeakRefRule implements Rule<WeakRef<WeakKey>> {

    public test: typeof isWeakRef = isWeakRef

    public prepare(
        this: this,
        data: WeakRef<WeakKey>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MajorObjectRule().prepare(data, config, context)
        const value: WeakKey | undefined = data.deref()
        if (value != undefined) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: WeakRef<WeakKey>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        const value: WeakKey | undefined = data.deref()
        return new MajorObjectRule({
            specialValue: {
                "[[WeakRefTarget]]": value == undefined ? "None" : `${
                    new AnythingRule().toString(value, config, context)}`
            }
        }).toString(data, config, context)
    }
}

export class MaximumWeakRefRule implements Rule<WeakRef<WeakKey>> {

    public test: typeof isWeakRef = isWeakRef

    public prepare(
        this: this,
        data: WeakRef<WeakKey>,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
        const value: WeakKey | undefined = data.deref()
        if (value != undefined) {
            new AnythingRule().prepare(value, config, context)
        }
    }

    public toString(
        this: this,
        data: WeakRef<WeakKey>,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        const value: WeakKey | undefined = data.deref()
        return new MaximumObjectRule({
            specialValue: {
                "[[WeakRefTarget]]": value == undefined ? "None" : `${
                    new AnythingRule().toString(value, config, context)}`
            }
        }).toString(data, config, context)
    }
}
