import { PrepareContext, RequiredConfig, Rule, ToStringContext } from "../config"
import { MaximumObjectRule } from "./object"

function isHTMLElement(data: unknown): data is HTMLElement {
    return typeof HTMLElement != "undefined" && data instanceof HTMLElement
}

export class MinimumHTMLElementRule implements Rule<HTMLElement> {

    public test: typeof isHTMLElement = isHTMLElement

    public toString(
        this: this,
        data: HTMLElement,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        let result: string = data.tagName
        if (data.id != "") {
            result += `#${data.id}`
        }
        for (const name of Array.from(data.classList)) {
            result += `.${name}`
        }
        return `[${Object.getPrototypeOf(data).constructor.name}: ${result}]`
    }
}

export class LesserHTMLElementRule implements Rule<HTMLElement> {

    public test: typeof isHTMLElement = isHTMLElement

    public toString(
        this: this,
        data: HTMLElement,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        if (data.innerHTML == "") {
            return data.outerHTML
        } else {
            const newData: HTMLElement = data.cloneNode(false) as HTMLElement
            newData.innerText = "..."
            return data.outerHTML
        }
    }
}

export class MajorHTMLElementRule implements Rule<HTMLElement> {

    public test: typeof isHTMLElement = isHTMLElement

    public toString(
        this: this,
        data: HTMLElement,
        __config: RequiredConfig,
        __context: ToStringContext
    ): string {
        return data.outerHTML
    }
}

export class MaximumHTMLElementRule implements Rule<HTMLElement> {

    public test: typeof isHTMLElement = isHTMLElement

    public prepare(
        this: this,
        data: HTMLElement,
        config: RequiredConfig,
        context: PrepareContext
    ): void {
        new MaximumObjectRule().prepare(data, config, context)
    }

    public toString(
        this: this,
        data: HTMLElement,
        config: RequiredConfig,
        context: ToStringContext
    ): string {
        return data.outerHTML + " " +
            new MaximumObjectRule().toString(data, config, context)
    }
}
