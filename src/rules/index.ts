import { Rule } from "../config"
import { NullRule } from "./null"
import { UndefinedRule } from "./undefined"
import { MinimumBasicStringRule, LesserBasicStringRule, MajorBasicStringRule, MaximumBasicStringRule } from "./basic-string"
import { LesserBasicNumberRule, MajorBasicNumberRule, MaximumBasicNumberRule, MinimumBasicNumberRule } from "./basic-number"
import { MinimumBasicBooleanRule, LesserBasicBooleanRule, MajorBasicBooleanRule, MaximumBasicBooleanRule } from "./basic-boolean"
import { MinimumStringRule, LesserStringRule, MajorStringRule, MaximumStringRule } from "./string"
import { MinimumNumberRule, LesserNumberRule, MajorNumberRule, MaximumNumberRule } from "./number"
import { MinimumBooleanRule, LesserBooleanRule, MajorBooleanRule, MaximumBooleanRule } from "./boolean"
import { LesserRegExpRule, MajorRegExpRule, MaximumRegExpRule, MinimumRegExpRule } from "./reg-exp"
import { MinimumSymbolRule, LesserSymbolRule, MajorSymbolRule, MaximumSymbolRule } from "./symbol"
import { LesserBigIntRule, MajorBigIntRule, MaximumBigIntRule, MinimumBigIntRule } from "./bigint"
import { MinimumSetRule, LesserSetRule, MajorSetRule, MaximumSetRule } from "./set"
import { MinimumMapRule, LesserMapRule, MajorMapRule, MaximumMapRule } from "./map"
import { MinimumWeakRefRule, LesserWeakRefRule, MajorWeakRefRule, MaximumWeakRefRule } from "./weak-ref"
import { MinimumErrorRule, LesserErrorRule, MajorErrorRule, MaximumErrorRule } from "./error"
import { LesserHTMLElementRule, MajorHTMLElementRule, MaximumHTMLElementRule, MinimumHTMLElementRule } from "./HTMLElement"
import { MinimumArrayRule, LesserArrayRule, MajorArrayRule, MaximumArrayRule } from "./array"
import { LesserObjectRule, MajorObjectRule, MaximumObjectRule, MinimumObjectRule } from "./object"
import { MinimumFunctionRule, LesserFunctionRule, MajorFunctionRule, MaximumFunctionRule } from "./function"

export const MINIMUM: Rule<unknown>[] = [
    new NullRule(),
    new UndefinedRule(),
    new MinimumBasicStringRule(),
    new MinimumBasicNumberRule(),
    new MinimumBasicBooleanRule(),
    new MinimumStringRule(),
    new MinimumNumberRule(),
    new MinimumBooleanRule(),
    new MinimumRegExpRule(),
    new MinimumSymbolRule(),
    new MinimumBigIntRule(),
    new MinimumSetRule(),
    new MinimumMapRule(),
    new MinimumWeakRefRule(),
    new MinimumErrorRule(),
    new MinimumHTMLElementRule(),
    new MinimumArrayRule(),
    new MinimumObjectRule(),
    new MinimumFunctionRule()
]

export const LESSER: Rule<unknown>[] = [
    new NullRule(),
    new UndefinedRule(),
    new LesserBasicStringRule(),
    new LesserBasicNumberRule(),
    new LesserBasicBooleanRule(),
    new LesserStringRule(),
    new LesserNumberRule(),
    new LesserBooleanRule(),
    new LesserRegExpRule(),
    new LesserSymbolRule(),
    new LesserBigIntRule(),
    new LesserSetRule(),
    new LesserMapRule(),
    new LesserWeakRefRule(),
    new LesserErrorRule(),
    new LesserHTMLElementRule(),
    new LesserArrayRule(),
    new LesserObjectRule(),
    new LesserFunctionRule()
]

export const MAJOR: Rule<unknown>[] = [
    new NullRule(),
    new UndefinedRule(),
    new MajorBasicStringRule(),
    new MajorBasicNumberRule(),
    new MajorBasicBooleanRule(),
    new MajorStringRule(),
    new MajorNumberRule(),
    new MajorBooleanRule(),
    new MajorRegExpRule(),
    new MajorSymbolRule(),
    new MajorBigIntRule(),
    new MajorSetRule(),
    new MajorMapRule(),
    new MajorWeakRefRule(),
    new MajorErrorRule(),
    new MajorHTMLElementRule(),
    new MajorArrayRule(),
    new MajorObjectRule(),
    new MajorFunctionRule()
]

export const MAXIMUM: Rule<unknown>[] = [
    new NullRule(),
    new UndefinedRule(),
    new MaximumBasicStringRule(),
    new MaximumBasicNumberRule(),
    new MaximumBasicBooleanRule(),
    new MaximumStringRule(),
    new MaximumNumberRule(),
    new MaximumBooleanRule(),
    new MaximumRegExpRule(),
    new MaximumSymbolRule(),
    new MaximumBigIntRule(),
    new MaximumSetRule(),
    new MaximumMapRule(),
    new MaximumWeakRefRule(),
    new MaximumErrorRule(),
    new MaximumHTMLElementRule(),
    new MaximumArrayRule(),
    new MaximumObjectRule(),
    new MaximumFunctionRule()
]
