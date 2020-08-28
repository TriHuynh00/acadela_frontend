import React from 'react';
import Acadela from "../acadelaSetting/Acadela";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";

class EditorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code: [
                '//type your code',
                'error',
                'case'
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
        monaco.languages.registerCompletionItemProvider(name, Acadela.getAutoCompleteProvider(monaco));

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