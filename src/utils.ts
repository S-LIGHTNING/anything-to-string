import { RequiredConfig } from "./config"

export function getIndentString(
    config: RequiredConfig
): string {
    const { indent } = config
    if (typeof indent == "number") {
        return " ".repeat(indent)
    } else {
        return indent
    }
}
