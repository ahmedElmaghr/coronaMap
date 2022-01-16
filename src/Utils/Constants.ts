import { JsonConvert, ValueCheckingMode } from "json2typescript";

export const WS_ISO2 = "EH";

export const jsonConvert = (): JsonConvert => {
    let jsonConvert: JsonConvert = new JsonConvert();
    jsonConvert.ignorePrimitiveChecks = false;
    jsonConvert.valueCheckingMode = ValueCheckingMode.ALLOW_NULL;
    return jsonConvert;
};