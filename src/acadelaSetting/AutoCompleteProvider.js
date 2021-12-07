// import MonacoEditor from "react-monaco-editor";

export default class AutoCompleteProvider {
    static defineAutoComplete(monaco) {
        return {
            /* provideCompletionItems: function (model, position) {
                var word = model.getWordUntilPosition(position);
                var range = {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                };
                return {
                    suggestions: [{
                        label: 'simpleText',
                        kind: monaco.languages.CompletionItemKind.Text,
                        insertText: 'simpleText',
                        range: range
                    },
                    {
                        label: 'EntityTemplate',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'entity $1',
                            "\tdescription = '$2'",
                            "\tmultiplicity = '$3'"
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        range: range
                    },
                    {
                        label: 'ifelse',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'if (${1:condition}) {',
                            '\t$0',
                            '} else {',
                            '\t',
                            '}'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                        range: range
                    }]
                };
                // return {suggestions: suggestions}; */
            provideCompletionItems: () => {
                var suggestions = [
                    {
                        label: 'simpleText',
                        kind: monaco.languages.CompletionItemKind.Text,
                        insertText: 'simpleText',
                    },
                    {
                        label: 'testing',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'testing(${1:condition})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    },
                    {
                        label: 'ifelse',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['if (${1:condition}) {', '\t$0', '} else {', '\t', '}'].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'Stage',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['Stage STAGENAME', '\t#mandatory #noRepeat', '\towner = \'Setting.CaseOwner\'', '\tlabel = \'STAGE LABEL\'', '\t', '\tPrecondition', '\t\tpreviousStep = \'PREVIOUSSTAGE\'', '\t', '\t'].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'HumanTask',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['HumanTask TASKNAME', '\t#mandatory', '\towner = \'Setting.CaseOwner\'', '\tlabel = \'TASK LABEL\'', '\tdueDateRef = \'Setting.DATENAME\'', '\texternalId = \'TASKNAME\'', '\t', '\t'].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'Form',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['Form FORMNAME', '\t#mandatory', '\t', '\t'].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'Field (Dropdown Input)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['Field FIELDNAME', '\t#custom', '\tCustomFieldValue = \'Setting.OPTIONS\'', '\tlabel = \'FIELD LABEL\'', '\t', ''].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'Field (Number Input)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['Field FIELDNAME', '\t#number(0-300)', '\tlabel = \'FIELD LABEL\'', '\tuiRef = \'colors(0 < green <= 120 < yellow <= 139 < red < 300)\'', '\t', ''].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'Field (Number Text)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['Field FIELDNAME', '\t#text #left', '\tlabel = \'FIELD LABEL\'', '\t', ''].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'Field (Text Display)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['Field FIELDNAME', '\t#left', '\tlabel = \'FIELD LABEL\'', '\texpression = \'if(FIELDREFERENCE1 < 80 and FIELDREFERENCE2 < 120) then "Normal" else if(FIELDREFERENCE1 < 80 and FIELDREFERENCE2 < 130) then "Elevated" else "High"\'', '\t', ''].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    }
                ];
                return { suggestions: suggestions };

            }
        };
    };
}