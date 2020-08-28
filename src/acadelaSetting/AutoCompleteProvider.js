
export default class AutoCompleteProvider {
    static defineAutoComplete(monaco) {
        return {
            provideCompletionItems: function(model, position) {
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
                            label: 'testing',
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: 'testing(${1:condition})',
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
                // return {suggestions: suggestions};
            }
        };
    };
}