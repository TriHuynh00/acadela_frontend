import NonTerminalSymbol from "./NonTerminalSymbol";
export default class ThemeDefinition {
    static themeDef = {
        base: 'vs',
        inherit: false,
        rules: [
            { token: NonTerminalSymbol.OBJECT, foreground: '660066' /*purple*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.ATTRIBUTE, foreground: '000066' /*dark blue*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.DIRECTIVE, foreground: '0099ff' /*light blue*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.ERROR, foreground: 'b4151c' /*red*/ },
            { token: NonTerminalSymbol.STRING, foreground: '4ca973' /*green*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.PREDEFINEDSTATE, foreground: 'ff8000' /*orange*/, fontStyle: 'bold' },
            { token: NonTerminalSymbol.COMMENT, foreground: 'bebebe' /*grey*/ },
            { token: NonTerminalSymbol.DEFAULT, foreground: '000000' /*black*/ }

        ]
    };
}
