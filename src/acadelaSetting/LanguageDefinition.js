import NonTerminalSymbol from "./NonTerminalSymbol";

export default class LanguageDefinition {
    static attrRegExp = new RegExp([
        'multiplicity',
        '|description'
    ].join(''));

    static objRegExp = new RegExp([
        'case',
        '|entity'
    ].join(''));

    static languageDef = {
        tokenizer: {
            root: [
                [this.objRegExp, NonTerminalSymbol.OBJECT],
                [this.attrRegExp, NonTerminalSymbol.ATTRIBUTE],
                [/error/, NonTerminalSymbol.ERROR],
                [/['].*[']/, NonTerminalSymbol.STRING]
            ]
        }
    };
}