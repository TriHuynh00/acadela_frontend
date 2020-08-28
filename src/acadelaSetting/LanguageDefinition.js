
export default class LanguageDefinition {
     static languageDef = {
         tokenizer: {
             root: [
                 [/error/, "error"],
                 [/case/, "obj-keywords"],
                 [/multiplicity|description/, "atr-keywords"],
                 [/['].*[']/, "str"]
             ]
         }
     };
}