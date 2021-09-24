import NonTerminalSymbol from "./NonTerminalSymbol";

export default class LanguageDefinition {

    static languageDef = {
        objectKeyWords: [
            'import', 'from',
            'define',
            'workspace',
            'case',
            'setting', 'caseowner', 'casepatient', 'attribute',
            'responsibilities', 'group', 'user',
            'summarypanel', 'section', 'infopath',
            'stage',
            'precondition',
            'humantask', 'autotask', 'dualtask',
            'form', 'field', 'dynamicfield', 'expression',
            'question', 'option',
            'trigger', 'on', 'invoke', 'method', 'failuremessage'
        ],
        attrKeyWords:
        [
            'prefix', 'version',
            'multiplicity', 'label', 'type', 'additionalDescription',
            'id', 'staticId', 'name',
            'value',
            'previousstep', 'condition',
            'uiRef',
            // Stage Element
            'owner', 'dynamicDescriptionRef', 'externalId', 'dueDateRef'
        ],
        predefinedState:
        [
            // Case Hook States
            'activate', 'complete', 'terminate', 'delete',
            // Task States
            'available', 'enable', 'correct',
            // Dual Task States
            'activatehumanpart', 'activateautopart',
            'completehumanpart', 'completeautopart', 'correcthumanpart', 'correctautopart',
            // http methods
            'post', 'get', 'put', 'delete'
        ],
        tokenizer: {
            root: [

                // [this.attrRegExp, NonTerminalSymbol.ATTRIBUTE],
                [/\*error\*/, NonTerminalSymbol.ERROR],
                [/['].*['][ $]+/, NonTerminalSymbol.STRING],
                [/(['].*['])|(["].*["])/, NonTerminalSymbol.STRING],
                [/\d+/, NonTerminalSymbol.STRING],
                [/#.*/, NonTerminalSymbol.DIRECTIVE],
                [/[a-z_$][\w$]*/, { cases: { '@objectKeyWords': NonTerminalSymbol.OBJECT,
                                             '@attrKeyWords': NonTerminalSymbol.ATTRIBUTE,
                                             '@predefinedState': NonTerminalSymbol.PREDEFINEDSTATE,
                                             '@default': 'default'} }],
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
