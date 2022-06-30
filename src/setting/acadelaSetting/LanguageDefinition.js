import NonTerminalSymbol from "./NonTerminalSymbol";

export default class LanguageDefinition {

    static languageDef = {
        objectKeyWords: [
            'Workspace',
            'Case',
            'Responsibilities',
            'Group',
            'User',
            'AttributeList',
            'import',
            'Setting',
            'Attribute',
            'CaseOwner',
            'CasePatient',
            'Trigger',
            'SummaryPanel',
            'Stage',
            'Task',
            'HumanTask',
            'AutomatedTask',
            'DualTask',
            'Form',
            'InputField',
            'use',
            'OutputField',
            'define',
            'InfoPath',
            'Section',
            'Precondition',
            'Hook',
        ],
        attrKeyWords:
            [
                // Case Attr
                'prefix',
                'version',
                // Shared Attr
                'label',
                'question',
                'option',
                'value',
                'additionalDescription',
                'dynamicDescriptionRef',
                'multiplicity',
                'type',
                'externalId',
                'defaultValues',
                // In/Output Field
                'expression',
                'uiRef',
                'customFieldValue',
                // User & Group
                'name',
                'staticId',
                'owner',
                'dueDateRef',
                // Sentry (Precondition)
                'previousStep',
                'condition',
                // Hook
                'on',
                'invoke',
                'POST',
                'GET',
                'PUT',
                'PATCH',
                'DELETE',
                'method',
                'failureMessage',
                'available',
                'enable',
                'activate',
                'complete',
                'terminate',
                'delete',
                'correct',
                'activatehumanpart',
                'activateautopart',
                'completehumanpart',
                'completeautopart',
                'correcthumanpart',
                'correctautopart',
                // Color
                'red',
                'blue',
                'green',
                'orange',
                'yellow',
            ],
        directiveKeyWords:
            [
                // Multiplicity
                'any',
                'atLeastOne',
                'exactlyOne',
                'maxOne',
                // Type
                'Link',
                'Users',
                'Entity',
                'noType',
                'text',
                'longtext',
                'boolean',
                'number',
                'singleChoice',
                'date',
                'date.after(TODAY)',
                'after',
                'json',
                'custom',
                // Position
                'left',
                'right',
                'center',
                'stretched',
                'leftCenter',
                'centerRight',
                // Mandatory
                'mandatory',
                'notMandatory',
                // Repeat
                'noRepeat',
                'repeatSerial',
                'repeatParallel',
                // Activation
                'autoActivate',
                'manualActivate',
                'activateWhen',
                // Readonly
                'readOnly',
                'notReadOnly',
                // Dual Task Part
                'humanDuty',
                'systemDuty',
            ],
        tokenizer: {
            root: [
                // [this.attrRegExp, NonTerminalSymbol.ATTRIBUTE],
                [/error/, NonTerminalSymbol.ERROR],

                [/"/,  { token: NonTerminalSymbol.STRING, bracket: '@open', next: '@stringDoubleQuote' } ],
                [/'/,  { token: NonTerminalSymbol.STRING, bracket: '@open', next: '@stringSingleQuote' } ],

                [/\#[\w\.]*[\(\w-\)]*/,  { token: NonTerminalSymbol.DIRECTIVE} ],

                [/[a-z_$][\w$]*/, {
                    cases: {
                        '@objectKeyWords': NonTerminalSymbol.OBJECT,
                        '@attrKeyWords': NonTerminalSymbol.ATTRIBUTE,
                        // '@directiveKeyWords': NonTerminalSymbol.DIRECTIVE,
                        '@default': NonTerminalSymbol.DEFAULT
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
            stringDoubleQuote: [
                [/[^\\"]+/,  NonTerminalSymbol.STRING],
                [/\\./,      'string.escape.invalid'],
                [/"/,        { token: NonTerminalSymbol.STRING, bracket: '@close', next: '@pop' } ]
            ],
            stringSingleQuote: [
                [/[^\\']+/,  NonTerminalSymbol.STRING],
                [/\\./,      'string.escape.invalid'],
                [/'/,        { token: NonTerminalSymbol.STRING, bracket: '@close', next: '@pop' } ]
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
