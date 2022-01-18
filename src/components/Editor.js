import React from "react";
import htmlparser from "html-react-parser";
import Acadela from "../acadelaSetting/Acadela";
import MonacoEditor from "react-monaco-editor"; /* USE 0.17.2 for item completion*/
import CompileService from "../services/compiler/CompileService";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '#aca0.1\n' +
      'workspace Umcg\n' +
      '\n' +
      'define case MRI_Schizophrenia\n' +
      '    prefix = \'MRI\'\n' +
      '    version = 2\n' +
      '    label = \'Schizophrenia Treatment\'\n' +
      '    \n' +
      '    Responsibilities\n' +
      '        group UmcgPhysicians name = \'Umcg Physician\' //staticId = \'asdf234\' \n' +
      '        group UmcgClinicians name = \'Umcg Clinician\'\n' +
      '        group UmcgProfessionals name = \'Umcg Professional\' \n' +
      '        group UmcgPatients name = \'Umcg Patient\' \n' +
      '        group UmcgNurses name = \'Umcg Nurse\' \n' +
      '\n' +
      '    // A comment\n' +
      '        /* a multiline\n' +
      '         * Comment\n' +
      '         */\n' +
      '\n' +
      '    Setting\n' +
      '        // label = "Case Configuration"\n' +
      '        CaseOwner UmcgProfessionals #exactlyOne\n' +
      '            label = \'UMCG Professionals\'\n' +
      '\n' +
      '        Attribute WorkplanDueDate\n' +
      '            #exactlyOne #date.after(TODAY)\n' +
      '            label = \'Workplan Due Date\'\n' +
      '            externalId = \'dueDateConnie\'\n' +
      '\n' +
      '        CasePatient UmcgPatients #exactlyOne\n' +
      '            label = \'Patient\'\n' +
      '            \n' +
      '        Attribute Clinician\n' +
      '            #exactlyOne #Link.Users(UmcgClinicians) \n' +
      '            label = \'Clinician\'\n' +
      '            \n' +
      '        Attribute Nurse\n' +
      '            #exactlyOne #Link.Users(UmcgNurses) \n' +
      '            label = \'Nurse\'\n' +
      '\n' +
      '    SummaryPanel\n' +
      '        Section MedicalInformation #stretched\n' +
      '            label = "Medical Information:"\n' +
      '            InfoPath Identification.MedicalInfo.Age\n' +
      '            InfoPath Identification.MedicalInfo.Gender\n' +
      '            InfoPath Identification.MedicalInfo.PsychosisTime\n' +
      '            InfoPath Identification.MedicalInfo.ConcomitantDisease\n' +
      '            InfoPath Identification.MedicalInfo.RiskGroup\n' +
      '            \n' +
      '        Section PatientPreferences #stretched\n' +
      '            label = "Patient Preferences:"\n' +
      '            InfoPath Identification.PatientPreferences.TreatmentGoal\n' +
      '            InfoPath Identification.PatientPreferences.PreviouslyUsedDrugs\n' +
      '            InfoPath Identification.PatientPreferences.AvoidSideEffect\n' +
      '            InfoPath Identification.PatientPreferences.PreferredDrugType\n' +
      '            InfoPath Identification.PatientPreferences.OtherImportances\n' +
      '            \n' +
      '        Section LastTherapySession #stretched\n' +
      '            label = "Patient Preferences:"\n' +
      '            InfoPath ShareDecisionMaking.OpenTherapySession.SelectedAntipsychotics\n' +
      '            InfoPath ShareDecisionMaking.OpenTherapySession.AvoidSideEffect\n' +
      '            InfoPath ShareDecisionMaking.OpenTherapySession.TolerableSideEffect\n' +
      '            \n' +
      '    Stage Identification\n' +
      '        #mandatory\n' +
      '        owner = \'Setting.CaseOwner\'\n' +
      '        label = \'Identification\'\n' +
      '\n' +
      '        HumanTask SelectPatient\n' +
      '            #mandatory\n' +
      '            label = \'Assign Patient\'\n' +
      '            owner = \'Setting.Nurse\'\n' +
      '            dueDateRef = \'Setting.WorkplanDueDate\'\n' +
      '            externalId = \'SelectPatient\'\n' +
      '            \n' +
      '            Form PatientAssignForm\n' +
      '                #mandatory\n' +
      '                \n' +
      '                Field SelectPatient\n' +
      '                    #custom\n' +
      '                    CustomFieldValue = "Setting.CasePatient"\n' +
      '                    label = "Assigned Patient"\n' +
      '                    \n' +
      '                Field SelectDoctor\n' +
      '                    #custom\n' +
      '                    CustomFieldValue = "Setting.Clinician"\n' +
      '                    label = "Assigned Clinician"\n' +
      '\n' +
      '        HumanTask MedicalInfo\n' +
      '            #mandatory\n' +
      '            label = "Medical Information"\n' +
      '            Form MedicalInfoForm\n' +
      '                #mandatory\n' +
      '                Field Age\n' +
      '                    #number\n' +
      '                    label = \'Age:\'\n' +
      '                    \n' +
      '                Field Gender\n' +
      '                    #singlechoice\n' +
      '                    question = \'Gender:\'\n' +
      '                        option \'Male\' value = \'0\'\n' +
      '                        option \'Female\' value = \'1\'\n' +
      '                        option \'Other\' value = \'2\'\n' +
      '                        \n' +
      '                Field PsychosisTime\n' +
      '                    #number\n' +
      '                    label = \'Length of Psychosis (Months):\'\n' +
      '                    \n' +
      '                Field ConcomitantDisease\n' +
      '                    #singlechoice #atLeastOne #left\n' +
      '                    additionalDescription = \'Is any of the following concomitant diseases known to you?\'\n' +
      '                    question = \'Known Concomitant Disease:\'\n' +
      '                        Option "Cardiac Diseases" value = "1"\n' +
      '                        Option "Epilepsy" value = "2"\n' +
      '                        Option "Liver Diseases" value = "3"\n' +
      '                        Option "Kidney Diseases" value = "4"\n' +
      '                        Option "Adipositas" value = "5"\n' +
      '                        Option "Diabetes" value = "6"\n' +
      '                        Option "Fat Metabolism Disorder" value = "7"\n' +
      '                        Option "Blood Count Changes" value = "8"\n' +
      '                        Option "Cognitive Changes/Dementias" value = "9"\n' +
      '                        \n' +
      '                Field RiskGroup\n' +
      '                    #singlechoice #atLeastOne #left\n' +
      '                    question = \'Which sub-group does the patient belongs to?\'\n' +
      '                        option \'Adolescence\' value = \'1\'\n' +
      '                        option \'Senior\' value = \'2\'\n' +
      '                        option \'Comorbid Substance Abuse\' value = \'3\'\n' +
      '                        option \'Predominantly Negative Symptoms\' value = \'4\'\n' +
      '                        option \'Psychologically Stable Patient\' value = \'5\'\n' +
      '                        option \'Therapy resistance\' value = \'6\'\n' +
      '                        option \'Pregnant\' value = \'7\'         \n' +
      '        \n' +
      '        HumanTask PatientPreferences\n' +
      '            #mandatory\n' +
      '            label = \'Record Medical Profile\'\n' +
      '            \n' +
      '            Form PrefForm\n' +
      '                #mandatory\n' +
      '                \n' +
      '                Field TreatmentGoal\n' +
      '                    #text\n' +
      '                    label = \'What would I like to achieve after the treatment? (Treatment Goal):\'\n' +
      '                \n' +
      '                Field PreviouslyUsedDrugs\n' +
      '                    #singlechoice #left #atLeastOne \n' +
      '                    Question = \'Previously Used Antipsychotics:\'\n' +
      '                        Option "Amisulprid" value = "1"\n' +
      '                        Option "Aripirazol" value = "2"\n' +
      '                        Option "Cariprazin" value = "3"\n' +
      '                        Option "Clozapin" value = "4"\n' +
      '                        Option "Haloperidol" value = "5"\n' +
      '                        Option "Olanzapin" value = "6"\n' +
      '                        Option "Paliperidon" value = "7"\n' +
      '                        Option "Risperidon" value = "8"\n' +
      '                        Option "Perphenazin" value = "9"\n' +
      '                        Option "Quetiapin" value = "10"\n' +
      '                        Option "Sertindol" value = "11"\n' +
      '                        Option "Ziprasidon" value = "12"\n' +
      '                        \n' +
      '                \n' +
      '                Field RetakePreviouslyUsedDrugs\n' +
      '                    #singlechoice #atLeastOne #center \n' +
      '                    Question = \'Which Drugs would be Used again:\'\n' +
      '                        Option "Amisulprid" value = "Amisulprid"\n' +
      '                        Option "Aripirazol" value = "Aripirazol"\n' +
      '                        Option "Cariprazin" value = "Cariprazin"\n' +
      '                        Option "Clozapin" value = "Clozapin"\n' +
      '                        Option "Haloperidol" value = "Haloperidol"\n' +
      '                        Option "Olanzapin" value = "Olanzapin"\n' +
      '                        Option "Paliperidon" value = "Paliperidon"\n' +
      '                        Option "Risperidon" value = "Risperidon"\n' +
      '                        Option "Perphenazin" value = "Perphenazin"\n' +
      '                        Option "Quetiapin" value = "Quetiapin"\n' +
      '                        Option "Sertindol" value = "Sertindol"\n' +
      '                        Option "Ziprasidon" value = "Ziprasidon"\n' +
      '                \n' +
      '                Field PrepareDrugTypeTaken\n' +
      '                    #singlechoice #stretched\n' +
      '                    Question = \'Medications can be administered as tablets, drops, or injections (usually several weeks apart). Do you want to start thinking about this now?\'\n' +
      '                        Option "Yes" value = "1"\n' +
      '                        Option "No" value = "0"\n' +
      '                    \n' +
      '                Field PreferredDrugType\n' +
      '                    #singlechoice #left #atLeastOne\n' +
      '                    Question = \'Preferred Drug Types:\'\n' +
      '                        Option "Syringes" value = "1"\n' +
      '                        Option "Pills" value = "2"\n' +
      '                        Option "Drops" value = "3"\n' +
      '                        \n' +
      '                Field AvoidSideEffect\n' +
      '                    #stretched #singlechoice #atLeastOne\n' +
      '                    Question = \'Side Effects to be Avoided:\'\n' +
      '                        Option \'Dry Mouth, Blurred Vision, Constipation\' value = \'1\'\n' +
      '                        Option \'Muscular Stiffness, Movement Disorders, Tremor\' value = \'2\'\n' +
      '                        Option \'Reduction of Sexual Desire, Sexual Dysfunction, Menstrual Cramps\' value = \'3\'\n' +
      '                        Option \'Weight Gain\' value = \'4\'\n' +
      '                        Option \'Fatigue\' value = \'5\'\n' +
      '                        Option \'Restless Legs\' value = \'6\'\n' +
      '                        \n' +
      '                Field OtherImportances\n' +
      '                    #text #notmandatory\n' +
      '                    label = \'Other Important Notes:\'\n' +
      '                    \n' +
      '    Stage ShareDecisionMaking\n' +
      '        #mandatory #repeatSerial\n' +
      '        owner = \'Setting.Clinician\'\n' +
      '        label = \'Share Decision Making\'\n' +
      '        \n' +
      '        Precondition\n' +
      '            previousStep = \'Identification\'\n' +
      '            \n' +
      '        Precondition\n' +
      '            previousStep = \'ShareDecisionMaking\'\n' +
      '                        \n' +
      '        HumanTask OpenTherapySession\n' +
      '            #mandatory #repeatParallel #atLeastOne\n' +
      '            label = \'Arrange Therapy Session\'\n' +
      '            owner = \'Setting.Clinician\'\n' +
      '            dueDateRef = \'Setting.WorkplanDueDate\'\n' +
      '            \n' +
      '            Form SDMForm\n' +
      '                #mandatory\n' +
      '                Field SelectedAntipsychotics\n' +
      '                    #singlechoice #atleastone\n' +
      '                    Question = \'Selected Antipsychotics:\'\n' +
      '                        Option "Amisulprid" value = "1"\n' +
      '                        Option "Aripirazol" value = "2"\n' +
      '                        Option "Cariprazin" value = "3"\n' +
      '                        Option "Clozapin" value = "4"\n' +
      '                        Option "Haloperidol" value = "5"\n' +
      '                        Option "Olanzapin" value = "6"\n' +
      '                        Option "Paliperidon" value = "7"\n' +
      '                        Option "Risperidon" value = "8"\n' +
      '                        Option "Perphenazin" value = "9"\n' +
      '                        Option "Quetiapin" value = "10"\n' +
      '                        Option "Sertindol" value = "11"\n' +
      '                        Option "Ziprasidon" value = "12"\n' +
      '                \n' +
      '                Field PsiacCheck\n' +
      '                    #longtext\n' +
      '                    label = \'PSIAC Verification of Conflicted Drugs\'\n' +
      '                \n' +
      '                Field AvoidSideEffect\n' +
      '                    #left #singlechoice #atLeastOne #notmandatory\n' +
      '                    Question = \'Side Effects to be Avoided:\'\n' +
      '                        Option \'Dry Mouth, Blurred Vision, Constipation\' value = \'1\'\n' +
      '                        Option \'Muscular Stiffness, Movement Disorders, Tremor\' value = \'2\'\n' +
      '                        Option \'Reduction of Sexual Desire, Sexual Dysfunction, Menstrual Cramps\' value = \'3\'\n' +
      '                        Option \'Weight Gain\' value = \'4\'\n' +
      '                        Option \'Fatigue\' value = \'5\'\n' +
      '                        Option \'Restless Legs\' value = \'6\'\n' +
      '                        Option \'Epilepsy\' value = \'7\'\n' +
      '                        \n' +
      '                Field TolerableSideEffect\n' +
      '                    #right #singlechoice #atLeastOne #notmandatory\n' +
      '                    Question = \'Side Effects to be Tolerated:\'\n' +
      '                        Option \'Dry Mouth, Blurred Vision, Constipation\' value = \'1\'\n' +
      '                        Option \'Muscular Stiffness, Movement Disorders, Tremor\' value = \'2\'\n' +
      '                        Option \'Reduction of Sexual Desire, Sexual Dysfunction, Menstrual Cramps\' value = \'3\'\n' +
      '                        Option \'Weight Gain\' value = \'4\'\n' +
      '                        Option \'Fatigue\' value = \'5\'\n' +
      '                        Option \'Restless Legs\' value = \'6\'\n' +
      '                \n' +
      '                Field Comment\n' +
      '                    #notmandatory #stretched\n' +
      '                    label = \'Comment:\'\n' +
      '                    \n' +
      '    Stage Discharge\n' +
      '        #mandatory #manualActivate\n' +
      '        owner = \'Setting.CaseOwner\'\n' +
      '        label = \'Discharge\'\n' +
      '        \n' +
      '        precondition\n' +
      '            previousStep = \'Identification\'\n' +
      '        \n' +
      '        HumanTask DischargePatient\n' +
      '            #mandatory\n' +
      '            owner = \'Setting.CaseOwner\'\n' +
      '            label = "Discharge Patient"\n' +
      '            \n' +
      '            Form DischargeForm\n' +
      '                Field DoctorNote \n' +
      '                    #text\n' +
      '                    label = "Post-Treatment Recommendation:"',
      error: false,
      success: false,
      errorMessage: "",
    };
  }

  submitCode = async () => {
    const codeVal = this.editor.getValue();
    const request = {};
    request.code = codeVal;
    request.mode = "compile";
    //console.log("code is", codeVal);
    const result = await CompileService.compileCode(request);
    console.log("the result", result);
    if (result.status === 201) {
      this.setState({ success: true, error: false, code: codeVal });
    } else if (result.status === 213) {
      let errorArr = result?.data?.traceback.toString().split("Exception:");
      let errorString = "Internal Error";
      //.replaceAll("'", "")
      if (errorArr.length > 1) {
        errorString = errorArr[1].replaceAll(/\\n/g, "<br/>");
      }

      console.log(errorString);
      this.setState({
        success: false,
        error: true,
        code: codeVal,
        errorMessage: errorString,
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
          <button
            onClick={this.submitCode}
            style={{
              marginTop: 10,
            }}
          >
            Submit
          </button>
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
              }}
              rows="3"
              readOnly
              value={"Successfully compiled!"}
            ></textarea>
          )}
        </div>
      </div>
    );
  }
}

export default Editor;
