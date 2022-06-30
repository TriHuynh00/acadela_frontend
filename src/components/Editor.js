import React from "react";
import htmlparser from "html-react-parser";
import Acadela from "../setting/acadelaSetting/Acadela";
import MonacoEditor from "react-monaco-editor"; /* USE 0.17.2 for item completion*/
import CompileService from "../services/compiler/CompileService";
import CaseJsonParserService from "../services/visualizer/CaseJsonParserService";
import { treatmentPlanTemplate } from "./TreatmentPlanTemplate";
import { treatmentPlanExercise } from "./TreatmentPlanExercise";
import { treatmentPlanWithErrorsStr } from "./TreatmentPlanWithErrors";
import GRAPH_COLOR_CODE from "../setting/graphSetting/elementColors";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: treatmentPlanTemplate,
      error: false,
			ideWidth: window.innerWidth > 1200 ? window.innerWidth * 0.5 : window.innerWidth,
			ideHeight: window.innerHeight * 0.75,
      success: false,
      successMessage: "Successfully Compiled",
      errorMessage: "",
      loading: false,
      currentTemplate: "hypertension",
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
      code: codeVal
    });
    //console.log("code is", codeVal);
    const result = await CompileService.compileCode(request);
    console.log("the result", result);
    if (result.status === 201) {
        var res = JSON.parse(JSON.stringify(result)).data;
        // console.log(`SACM Case Template\n${res}`);
        var caseJson = res.substring(res.indexOf('"jsonTemplate"'));
        console.log(caseJson);
        // Object.keys(data).forEach((prop)=> console.log(`${prop}: ${data.prop}`));
        // console.log(result.toString().substring(result.indexOf('"jsonTemplate"')));

        this.props.setNodeDataArray(
            [
                { key: "Identification", text: 'Identification', bgColor: GRAPH_COLOR_CODE.STAGE, textColor: "white", loc: '0 0', isGroup: true },
                { key: "AdmitPatient", text: 'Admit Patient', color: 'lightblue', group: 'Identification' },
                { key: "Consent", text: 'Consent', color: 'lightblue',  group: 'Identification'},

                { key: "Evaluation", text: 'Evaluation', bgColor: GRAPH_COLOR_CODE.STAGE, textColor: "white", loc: '500 0', isGroup: true },
                { key: "MeasureBloodPressure", text: 'Measure Blood Pressure', bgColor: GRAPH_COLOR_CODE.TASK, textColor: "white", group: 'Evaluation', isGroup: true },
                { key: "Systolic", text: 'Systolic', color: GRAPH_COLOR_CODE.INPUTFIELD, stroke: "white", group: 'MeasureBloodPressure' },
                { key: "Diastolic", text: 'Diastolic', color: GRAPH_COLOR_CODE.OUTPUTFIELD, stroke: "white", group: 'MeasureBloodPressure' },
                { key: "Hook", text: 'Hook1', color: GRAPH_COLOR_CODE.EXTERNALCOMM, group: 'MeasureBloodPressure' },
                { key: "MeasureCGI", text: 'Measure CGI', color: 'lightblue',  group: 'Evaluation'},
            ]
        );

        this.props.setLinkDataArray(
            [
                { from: 'Identification', to: "Evaluation", condText: "Identification.ConsentForm.Consent=1 and \n Identification.ConsentForm.Consent > 0" },
            ]
        );

        console.log("Parsing CP in JSON")
        CaseJsonParserService.parseJsonCp("{" + caseJson);

        this.setState({
            success: true,
            error: false,
            code: codeVal,
            successMessage:
              flag === "submit"
                ? "Successfully load the case into SACM!"
                : "Successfully Compiled!",
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
    console.log(window.innerWidth);
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
        <div >
          <MonacoEditor
            id="AcadelaEditor"
            width={this.state.ideWidth}
            height={this.state.ideHeight}
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
            <button
              onClick={() =>
                this.setState({
                  code: treatmentPlanWithErrorsStr,
                  currentTemplate: "cholesterol",
                })
              }
              disabled={this.state.currentTemplate === "cholesterol"}
              style={{
                //backgroundColor: "#008CBA",
                //color: "white",
                padding: "10px 15px",
                marginLeft: 60,
                marginRight: 20,
                marginBottom: 20,
                fontWeight: "bold",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Load Cholesterol Treatment
            </button>
            <button
              onClick={() =>
                this.setState({
                  code: treatmentPlanTemplate,
                  currentTemplate: "hypertension",
                })
              }
              disabled={this.state.currentTemplate === "hypertension"}
              style={{
                //backgroundColor: "#008CBA",
                //color: "white",
                padding: "10px 15px",
                marginRight: 20,
                marginBottom: 20,
                fontWeight: "bold",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Load Hypertension Treatment
            </button>

            <button
                onClick={() =>
                    this.setState({
                      code: treatmentPlanExercise,
                      currentTemplate: "exercise",
                    })
                }
                disabled={this.state.currentTemplate === "exercise"}
                style={{
                  //backgroundColor: "#008CBA",
                  //color: "white",
                  padding: "10px 15px",
                  marginRight: 20,
                  marginBottom: 20,
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
            >
              Load Exercise
            </button>
          </div>
        </div>
        <div>
          {this.state.error && (
            <textarea
              style={{
                color: "red",
                width: this.state.ideWidth + "px",
                marginLeft: "3px",
                marginTop: 10,
                marginBottom: 10,
                borderStyle: "solid",
                borderWidth: "2px",
                fontSize: "14px",
                fontWeight: 500,
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
                width: this.state.ideWidth + "px",
                marginLeft: "3px",
                marginTop: 10,
                marginBottom: 10,
                borderStyle: "solid",
                borderWidth: "2px",
                fontSize: "14px",
                fontWeight: 500,
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
