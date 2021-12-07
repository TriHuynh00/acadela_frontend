import NonTerminalSymbol from "./NonTerminalSymbol";

export default class LanguageDefinition {

    static languageDef = {
        objectKeyWords: [
            'workspace', 'case',
            'group', 'user',
            'entity',
            'attributelist',
            'casedefinition',
            'field',

            'imports',
            'setting',
            'trigger',
            'summarypanel',
            'stage',
            'humantask',
            'automatedtask',
            'dualtask',
            'form',
            'dynamicfield',
            'define',
            'infoPath',
            'section',
            'Precondition',
            'CaseOwner',
            'Attribute',
            'Responsibilities',
            'CasePatient'
        ],
        attrKeyWords:
            [
                'multiplicity', 'description', 'type',
                'id', 'staticId',
                'prefix',
                'version',
                'label',
                'externalId',
                'owner',
                'dueDateRef',
                'previousStep',
                'expression',
                'uiRef',
                'CustomFieldValue'

            ],
        stateKeyWords:
            [
                'exactlyOne',
                'number',
                'text',
                'date',
                'after',
                'maxOne',
                'Link',
                'users',
                'left',
                'right',
                'center',
                'mandatory',
                'noRepeat',
                'custom',
                'notmandatory',
                '#'
            ],
        tokenizer: {
            root: [

                // [this.attrRegExp, NonTerminalSymbol.ATTRIBUTE],
                [/error/, NonTerminalSymbol.ERROR],
                [/['].*[']/, NonTerminalSymbol.STRING],
                [/[a-z_$][\w$]*/, {
                    cases: {
                        '@objectKeyWords': NonTerminalSymbol.OBJECT,
                        '@attrKeyWords': NonTerminalSymbol.ATTRIBUTE,
                        '@stateKeyWords': NonTerminalSymbol.STATE,
                        '@default': 'identifier'
                    }
                }],
                { include: '@whitespace' }
            ],
            comment: [
                [/[^\/*]+/, NonTerminalSymbol.COMMENT],
                [/\/\*/, NonTerminalSymbol.COMMENT, '@push'],    // nested comment
                ["\\*/", NonTerminalSymbol.COMMENT, '@pop'],
                [/[\/*]/, NonTerminalSymbol.COMMENT]
            ],

            whitespace: [
                [/[ \t\r\n]+/, 'white'],
                [/\/\*/, NonTerminalSymbol.COMMENT, '@comment'],
                [/\/\/.*$/, NonTerminalSymbol.COMMENT],
            ],
        },
        ignoreCase: true
    };
}