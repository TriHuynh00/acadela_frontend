import React from 'react';
import Acadela from "../acadelaSetting/Acadela";
import MonacoEditor from "react-monaco-editor";

import * as monaco from "monaco-editor";
import Editor from "../components/Editor";

class EditorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <Editor></Editor>
            </div>
        );
    }
}

export default EditorView;