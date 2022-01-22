// import MonacoEditor from "react-monaco-editor";

import LanguageDefinition from "./LanguageDefinition";

export default class AutoCompleteProvider {

    static constructKeywordAutoCompleteSuggestions = (monaco) => {
        let keyWordlist = [];

        let languageKeyWords = [
            LanguageDefinition.languageDef.objectKeyWords,
            LanguageDefinition.languageDef.attrKeyWords,
            LanguageDefinition.languageDef.directiveKeyWords
        ];

        // push the keywords in each keyword type into the list
        // of keywords for autocompletion
        languageKeyWords.forEach(keywordType => {
            keywordType.forEach(keyword => {
                keyWordlist.push(
                    {
                        label: keyword,
                        kind: monaco.languages.CompletionItemKind.Text,
                        insertText: keyword,
                    }
                )
            })
        });


        return keyWordlist

    };

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
                    // {
                    //     label: 'simpleText',
                    //     kind: monaco.languages.CompletionItemKind.Text,
                    //     insertText: 'simpleText',
                    // },
                    // {
                    //     label: 'testing',
                    //     kind: monaco.languages.CompletionItemKind.Keyword,
                    //     insertText: 'testing(${1:condition})',
                    //     insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    // },
                    {
                        label: 'Import (with alias)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'import Path.to.file as ALIAS'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Import file with alias',
                    },
                    {
                        label: 'Group (Basic)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'group GROUPID name = \'Group Name\''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Basic Group Definition',
                    },
                    {
                        label: 'Group (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'group GROUPID name = \'Group Name\' staticId = \'group_ID_in_SACM\''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Full Group Definition',
                    },
                    {
                        label: 'User (Basic)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'user userId'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Basic User Definition',
                    },
                    {
                        label: 'User (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'user userID staticId = \'user_ID_in_SACM\''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Full User Definition',
                    },
                    {
                        label: 'Setting (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'Setting',
                            '\tCaseOwner EXPERTGROUPID #any}',
                            '\t\tlabel = \'MEDICALGROUPNAME\'',
                            '',
                            '\tCasePatient PATIENTGROUPID #any',
                            '\t\tlabel = \'PATIENTGROUPNAME\'',
                            '',
                            '\tAttribute WorkplanDueDate',
                            '\t\t#exactlyOne',
                            '\t\t#date.after(TODAY)\'',
                            '\t\tlabel = \'Workplan Due Date Name\'',
                            '\t\texternalId = \'dueDateExtId\'',
                            '\t\t',
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Full Setting Config',
                    },
                    {
                        label: 'Stage (Basic)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'Stage STAGENAME',
                            '\towner = \'Setting.CaseOwner\'',
                            '\tlabel = \'STAGE_LABEL\'',
                            '\t',
                            '\tPrecondition',
                            '\t\tpreviousStep = \'PREVIOUS_STAGE\'',
                            '\t',].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'Stage (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['' +
                            'Stage STAGENAME',
                            '\t#mandatory',
                            '\t#noRepeat',
                            '\t#autoActivate',
                            '\t#any',
                            '\towner = \'Setting.CaseOwner\'',
                            '\tlabel = \'STAGE_LABEL\'',
                            '\tadditionalDescription = \'ADDITIONAL_DESCRIPTION\'',
                            '\texternalId = \'EXTERNAL_ID\'',
                            '\tdynamicDescriptionRef = \'PATH_TO_OBJ_OF_DYNAMIC_DESCRIPTION\'',
                            '\t',
                            '\tPrecondition',
                            '\t\tpreviousStep = \'PREVIOUS_STAGE\'',
                            '\t'].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Full Stage Definition',
                    },
                    {
                        label: 'HumanTask (Basic)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'HumanTask TASKNAME',
                            '\t#mandatory',
                            '\towner = \'Setting.CaseOwner\'',
                            '\tlabel = \'TASK_LABEL\'',
                            '\tdueDateRef = \'Setting.DATENAME\'',
                            '\texternalId = \'TASK_NAME\'',
                            '\t',
                            '\tPrecondition',
                            '\t\tpreviousStep = \'PREVIOUS_STAGE\'',
                            '\t',
                            '\t'].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Full Human Task Definition',
                    },
                    {
                        label: 'HumanTask (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'HumanTask TASKNAME',
                            '\t#mandatory',
                            '\t#noRepeat',
                            '\t#autoActivate',
                            '\t#any',
                            '\towner = \'Setting.CaseOwner\'',
                            '\tlabel = \'TASK_LABEL\'',
                            '\tdueDateRef = \'Setting.DATENAME\'',
                            '\tadditionalDescription = \'ADDITIONAL_DESCRIPTION\'',
                            '\texternalId = \'EXTERNAL_ID\'',
                            '\tdynamicDescriptionRef = \'PATH_TO_OBJ_OF_DYNAMIC_DESCRIPTION\'',
                            '\t',
                            '\tPrecondition',
                            '\t\tpreviousStep = \'PREVIOUS_STAGE\'',
                            '\t\tcondition = \'TRANSITION_CONDITION\'',
                            '\t',
                            '\tOn #TASK_STATE',
                                '\t\t\invoke \'EXTERNAL_SYSTEM_URL\'',
                                '\t\tmethod HTTP_METHOD',
                                '\t\twith failureMessage \'ERROR_MESSAGE\'',
                            '\t'].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Full Human Task Definition',
                    },
                    {
                        label: 'Trigger for Case (Sends a HTTP Request)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'Trigger',
                            'On CaseState',
                            '\tinvoke \'EXTERNAL_SYSTEM_URL\'',
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Case Hook Definition',
                    },
                    {
                        label: 'Trigger for Task/Stage (Sends a HTTP Request)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'Trigger',
                            'On TaskOrStageState',
                            '\tinvoke \'EXTERNAL_SYSTEM_URL\'',
                            '\tmethod HTTP_METHOD',
                            '\twith failureMessage \'ERROR_MESSAGE\'',
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Task/Stage Hook Definition',
                    },
                    {
                        label: 'Hook for Case (Sends a HTTP Request)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'On CaseState',
                            '\tinvoke \'EXTERNAL_SYSTEM_URL\'',
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Case Hook Definition',
                    },
                    {
                        label: 'Hook for Task/Stage (Sends a HTTP Request)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            '\/\/Hook HOOKNAME',
                            'On TaskOrStageState',
                            '\tinvoke \'EXTERNAL_SYSTEM_URL\'',
                            '\tmethod HTTP_METHOD',
                            '\twith failureMessage \'ERROR_MESSAGE\'',
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Task/Stage Hook Definition',
                    },
                    {
                        label: 'Form (Without Global Directive)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'Form FORMNAME',
                                '\tInputField INPUT_FIELD_NAME',
                                '\t#text',
                                '\tlabel = \'FIELD_LABEL\'',
                                '\t',
                                '\t\/\/Add OutputField if required',
                                '\t'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Form Definition',
                    },
                    {
                        label: 'Form (With Global Directive for all Fields)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'Form FORMNAME',
                            '\t#mandatory',
                            '\t#notReadOnly',
                            '\tInputField INPUT_FIELD_NAME',
                            '\t#text',
                            '\tlabel = \'FIELD_LABEL\'',
                            '\t',
                            '\t\/\/Add OutputField if required',
                            '\t'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Form Definition',
                    },
                    {
                        label: 'InputField (Dropdown Input)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'InputField FIELDNAME',
                            '\t#custom',
                            '\tCustomFieldValue = \'PATH_TO_OBJECT_CONTAINING_OPTIONS\'',
                            '\tlabel = \'FIELD LABEL\'',
                            '\t',
                            ''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Drop Down InputField',
                    },
                    {
                        label: 'InputField (Ranged Numeric InputField)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'InputField FIELDNAME',
                            '\t#number(0-300)',
                            '\tlabel = \'FIELD LABEL\'',
                            '\tuiRef = \'colors(0 < green <= 120 < yellow <= 139 < red < 300)\'',
                            '\t', ''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Ranged Numeric InputField Statement',
                    },
                    {
                        label: 'InputField (Text)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'InputField FIELDNAME',
                                '\t#text #left',
                                '\tlabel = \'FIELD LABEL\'',
                                '\t', ''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Textual Input Field Definition',
                    },
                    {
                        label: 'InputField - Field (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['InputField FIELDNAME',
                            '\t#mandatory',
                            '\t#notReadOnly',
                            '\t#left',
                            '\t#maxOne',
                            '\t\/\/#humanDuty \/\/Only for Dual Task',
                            '\t#noType',
                            '\tlabel = \'INPUT_FIELD_LABEL\'',
                            '\tadditionalDescription = \'ADDITIONAL_DESCRIPTION\'',
                            '\t\/\/CustomFieldValue = \'PATH_TO_A_CASE_OBJECT\'',
                            '\tuiRef = \'INPUT_VISUALIZATION_DEFINITION\'',
                            '\texternalId = \'EXTERNAL_ID\'',
                            '\tdefaultValues = \'DEFAULT_VALUES\'',
                            '\t', ''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete InputField as Field Definition',
                    },
                    {
                        label: 'InputField - Single Choice (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['InputField FIELDNAME',
                            '\t#mandatory',
                            '\t#notReadOnly',
                            '\t#left',
                            '\t#maxOne',
                            '\t\/\/#humanDuty \/\/Only for Dual Task',
                            '\t#singleChoice',
                            '\tQuestion = \'INPUT_STATEMENT_OR_QUESTION\'',
                            '\t\tOption "OPTION1" value = "VALUE1"',
                            '\t\t\t\/\/additionalDescription = "EXTRA_DESCRIPTION_FOR_OPTION"',
                            '\t\t\t\/\/externalId = "OPTION_EXTERNAL_ID"',
                            '\tadditionalDescription = \'ADDITIONAL_DESCRIPTION\'',
                            '\t\/\/CustomFieldValue = \'PATH_TO_A_CASE_OBJECT\'',
                            '\tuiRef = \'OUTPUT_VISUALIZATION_DEFINITION\'',
                            '\texternalId = \'EXTERNAL_ID\'',
                            '\tdefaultValues = \'DEFAULT_VALUES\'',
                            '\t'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete SingleChoice InputField Definition',
                    },
                    {
                        label: 'OutputField (Conditional)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['OutputField FIELDNAME',
                            '\t#left',
                            '\tlabel = \'FIELD LABEL\'',
                            '\texpression = \'if(FIELD_NAME < NUM and FIELD_NAME >= NUM) then ' +
                                                '"OUTPUT1" ' +
                                             'else if(FIELD_NAME = NUM or FIELD_NAME = "TEXT") then ' +
                                                '"OUTPUT2" ' +
                                             'else ' +
                                                '"OUTPUT3"\'',
                            '\t', ''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Conditional Output Field Definition',
                    },
                    {
                        label: 'OutputField (Customize Output Data Location)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['OutputField FIELDNAME',
                            '\t#left',
                            '\t#custom',
                            '\tlabel = \'FIELD LABEL\'',
                            '\t\/\/CustomFieldValue = \'PATH_TO_A_CUSTOM_GLOBAL_ELEMENT\'',
                            '\texpression = \'DISPLAY_OUTPUT_EXPRESSION\'',
                            '\t', ''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Output Field to Custom Element Definition',
                    },
                    {
                        label: 'OutputField (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: ['OutputField FIELDNAME',
                            '\t#mandatory',
                            '\t#notReadOnly',
                            '\t#left',
                            '\t#noType',
                            '\tlabel = \'OUTPUT_FIELD_LABEL\'',
                            '\tadditionalDescription = \'ADDITIONAL_DESCRIPTION\'',
                            '\t\/\/CustomFieldValue = \'PATH_TO_A_CASE_OBJECT\'',
                            '\tuiRef = \'OUTPUT_VISUALIZATION_DEFINITION\'',
                            '\texpression = \'DISPLAY_OUTPUT_EXPRESSION\'',
                            '\texternalId = \'EXTERNAL_ID\'',
                            '\tdefaultValues = \'DEFAULT_VALUES\'',
                            '\t', ''
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Complete OutputField Definition',
                    },
                    {
                        label: 'number (min-max)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'number(${1:min}-${2:max})'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Number (min-max) Definition',
                    },
                    // Operator
                    {
                        label: 'ifElse (Full)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'if (${1:condition}) then ',
                            '\t$2',
                            'else if (${3:condition}) then',
                            '\t$4',
                            'else',
                            '\t$5'
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-ElseIf-Else Statement',
                    },
                    {
                        label: 'ifElse',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'if (${1:condition}) then ',
                            '\t$2',
                            'else',
                            '\t$3',
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'If-Else Statement',
                    },
                    {
                        label: 'colors (Color Range Definition)',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: [
                            'colors(0 < green <= 100 < yellow <= 200 < red < 300)',
                        ].join('\n'),
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Colors Function',
                    },



                ].concat(
                    this.constructKeywordAutoCompleteSuggestions(monaco)
                );
                return { suggestions: suggestions };
            }
        };
    };
}
