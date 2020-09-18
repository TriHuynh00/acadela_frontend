import NonTerminalSymbol from "./NonTerminalSymbol";

export default class LanguageDefinition {

    static languageDef = {
        objectKeyWords: [
            'workspace', 'case',
            'group', 'user',
            'entity',
            'attributelist',
            'casedefinition',
        ],
        attrKeyWords:
        [
            'multiplicity', 'description', 'type',
            'id', 'staticId'
        ],
        tokenizer: {
            root: [

                // [this.attrRegExp, NonTerminalSymbol.ATTRIBUTE],
                [/error/, NonTerminalSymbol.ERROR],
                [/['].*[']/, NonTerminalSymbol.STRING],
                [/[a-z_$][\w$]*/, { cases: { '@objectKeyWords': NonTerminalSymbol.OBJECT,
                                             '@attrKeyWords': NonTerminalSymbol.ATTRIBUTE,
                                             '@default': 'identifier'} }],
                {include: '@whitespace'}
            ],
            comment: [
                [/[^\/*]+/, NonTerminalSymbol.COMMENT ],
                [/\/\*/,    NonTerminalSymbol.COMMENT, '@push' ],    // nested comment
                ["\\*/",    NonTerminalSymbol.COMMENT, '@pop'  ],
                [/[\/*]/,   NonTerminalSymbol.COMMENT ]
            ],

            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/\/\*/,       NonTerminalSymbol.COMMENT, '@comment' ],
                [/\/\/.*$/,    NonTerminalSymbol.COMMENT],
            ],
        },
        ignoreCase: true
    };
}