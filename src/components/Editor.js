import React from 'react';
import Acadela from "../acadelaSetting/Acadela";
import MonacoEditor from "react-monaco-editor"; /* USE 0.17.2 for item completion*/
import CompileService from "../services/compiler/CompileService";

class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code:''
        }
    }

    submitCode = () => {
        const codeVal = this.editor.getValue();
        const request = {};
        request.code = codeVal;
        request.mode = "compile";
        console.log("code is", codeVal);
        CompileService.compileCode(request);

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

    editorDidMount = (editor) => {
        console.log('editorDidMount', editor);
        this.editor = editor;
        editor.focus();
    }


    onChange = (newValue, e) => {
        console.log('onChange', newValue, e);
    }

    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <div>
                <MonacoEditor
                    id="AcadelaEditor"
                    width="800"
                    height="600"
                    language={Acadela.getName()}
                    theme={Acadela.getThemeName()}
                    ignoreCase="True"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorWillMount={this.editorWillMount}
                    editorDidMount={this.editorDidMount}
                />

                <button onClick={this.submitCode}>
                    Submit
                </button>
            </div>
        );
    }
}

export default Editor;
