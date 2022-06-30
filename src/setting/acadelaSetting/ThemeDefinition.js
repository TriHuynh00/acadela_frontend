import NonTerminalSymbol from "./NonTerminalSymbol";
export default class ThemeDefinition {
    static themeDef = {
        base: 'vs',
        inherit: false,
        rules: [
            { token: NonTerminalSymbol.OBJECT, foreground: '660066' /*purple*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.ATTRIBUTE, foreground: '1167b1' /*dark blue*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.DIRECTIVE, foreground: 'E08400' /*dark blue*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.ERROR, foreground: 'b4151c' /*red*/ },
            { token: NonTerminalSymbol.STRING, foreground: '4ca973' /*green*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.COMMENT, foreground: 'bebebe' /*grey*/ },
            { token: NonTerminalSymbol.DEFAULT, foreground: '014666' /*light blue*/ }
        ]
    };
}
