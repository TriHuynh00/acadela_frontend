import React from "react";
import htmlparser from "html-react-parser";
import Acadela from "../acadelaSetting/Acadela";
import MonacoEditor from "react-monaco-editor"; /* USE 0.17.2 for item completion*/
import CompileService from "../services/compiler/CompileService";
import {treatmentPlanTemplate} from "./TreatmentPlanTemplate"
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:
      treatmentPlanTemplate,
      error: false,
      success: false,
      successMessage: "Successfully Compiled",
      errorMessage: "",
      loading: false,
    };
  }

  submitCode = async (flag) => {
    const codeVal = this.editor.getValue();
    const request = {};
    request.code = codeVal;
    request.mode = "compile";
    request.connect = flag;
    this.setState({
      success: false,
      error: false,
      loading: true,
    });
    //console.log("code is", codeVal);
    const result = await CompileService.compileCode(request);
    console.log("the result", result);
    if (result.status === 201) {
      this.setState({
        success: true,
        error: false,
        code: codeVal,
        successMessage: flag==="submit" ? "Successfully load the case into SACM!":"Successfully Compiled!",
        loading: false,
      });
    } else if (result.status === 213) {
      let errorString = "Internal Error";

      if (result?.data?.traceback) {
        let errorArr = result?.data?.traceback.toString().split("Exception:");
        //.replaceAll("'", "")
        if (errorArr.length > 1) {
          errorString = errorArr[1].replaceAll(/\\n/g, "<br/>");
        }
      }

      console.log(errorString);
      this.setState({
        success: false,
        error: true,
        code: codeVal,
        errorMessage: errorString,
        loading: false,
      });
    }
  };

  editorWillMount(monaco) {
    let theme = Acadela.getThemeName();
    let name = Acadela.getName();

    monaco.languages.register({ id: name });

    // Define color code for the syntax highlighter
    monaco.languages.setMonarchTokensProvider(name, Acadela.languageDef);

    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider(
      name,
      Acadela.getAutoCompleteProvider(monaco)
    );

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme(theme, Acadela.themeDef);
    console.log("Acadela Name " + name);
  }

  editorDidMount = (editor) => {
    console.log("editorDidMount", editor);
    this.editor = editor;
    editor.focus();
  };

  onChange = (newValue, e) => {
    // console.log("onChange", newValue, e);
  };

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <div>
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
          <div
            style={{
              marginLeft: "10px",
              marginTop: 20,
            }}
          >
            <button
              onClick={() => this.submitCode("validate")}
              style={{
                backgroundColor: "#1E90FF",
                color: "white",
                fontWeight: "bold",
                padding: "10px 30px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Validate
            </button>
            <button
              onClick={() => this.submitCode("submit")}
              style={{
                backgroundColor: "#008CBA",
                color: "white",
                padding: "10px 30px",
                marginLeft: 30,
                marginRight: 20,
                fontWeight: "bold",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            {this.state.loading && (
              <span className="visually-hidden">Loading...</span>
            )}
          </div>
        </div>
        <div>
          {this.state.error && (
            <textarea
              style={{
                color: "red",
                width: "780px",
                marginLeft: "3px",
                marginTop: 10,
                marginBottom: 10,
                borderStyle: "solid",
                borderWidth: "2px",
                fontSize: '15px',
                fontWeight:500
              }}
              rows="9"
              readOnly
              value={htmlparser(this.state.errorMessage)}
            ></textarea>
          )}
          {this.state.success && (
            <textarea
              style={{
                color: "green",
                width: "780px",
                marginLeft: "3px",
                marginTop: 10,
                marginBottom: 10,
                borderStyle: "solid",
                borderWidth: "2px",
                fontSize: '15px',
                fontWeight:500
              }}
              rows="3"
              readOnly
              value={this.state.successMessage}
            ></textarea>
          )}
        </div>
      </div>
    );
  }
}

export default Editor;
