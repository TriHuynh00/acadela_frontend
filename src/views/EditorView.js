import React from 'react';
import Acadela from "../acadelaSetting/Acadela";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";

class EditorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: [
                '[notice] Apache/1.3.29 (Unix) configured -- resuming normal operations',
                '[info] Server built: Feb 27 2004 13:56:37',
            ].join('\n')

        }
    }

    editorWillMount(monaco) {
        let theme = Acadela.getThemeName();
        let name = Acadela.getName();

        monaco.languages.register({id: name});

        // Define color code for the syntax highlighter
        monaco.languages.setMonarchTokensProvider(name, Acadela.languageDef);

        // Register a completion item provider for the new language
        monaco.languages.registerCompletionItemProvider(name,{
            provideCompletionItems: function(model, position, context, token) {
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
        });

        // Define a new theme that contains only rules that match this language
        monaco.editor.defineTheme(theme, Acadela.themeDef);
        console.log("Acadela Name " + name);
    }

    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);

        editor.focus();
    }


    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (

            <MonacoEditor
                id="AcadelaEditor"
                width="800"
                height="600"
                language={Acadela.getName()}
                theme={Acadela.getThemeName()}
                value={code}
                options={options}
                onChange={this.onChange}
                editorWillMount={this.editorWillMount}
                editorDidMount={this.editorDidMount}
            />
        );
    }
}

export default EditorView;