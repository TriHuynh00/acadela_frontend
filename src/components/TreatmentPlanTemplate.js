export const treatmentPlanTemplate =  "#aca0.1\n" +
"import extfile.redGreenUiRef as rgu\n" +
"\n" +
"workspace Umcg\n" +
"\n" +
"define case ST1_Hypertension\n" +
"    prefix = 'ST1'\n" +
"    version = 8\n" +
"    label = 'Hypertension Treatment'\n" +
"    \n" +
"    Responsibilities\n" +
"        group UmcgPhysicians name = 'Umcg Physician' //staticId = 'asdf234' \n" +
"        group UmcgClinicians name = 'Umcg Clinician'\n" +
"        group UmcgProfessionals name = 'Umcg Professional' \n" +
"        group UmcgPatients name = 'Umcg Patient' \n" +
"        group UmcgNurses name = 'Umcg Nurse' \n" +
"            //user williamst\n" +
"            //user michelf\n" +
"            //user hopkinsc\n" +
"    // A comment\n" +
"        /* a multiline\n" +
"         * Comment\n" +
"         */\n" +
"\n" +
"    Setting\n" +
"        CaseOwner UmcgProfessionals #exactlyOne\n" +
"            label = 'UMCG Professionals'   \n" +
"        Attribute WorkplanDueDate\n" +
"            #exactlyOne #date.after(TODAY)\n" +
"            label = 'Workplan Due Date'\n" +
"            externalId = 'dueDateConnie'\n" +
"\n" +
"        CasePatient UmcgPatients #exactlyOne\n" +
"            label = 'Patient'\n" +
"          \n" +
"        Attribute Clinician\n" +
"            #exactlyOne #Link.Users(UmcgClinicians) \n" +
"            label = 'Clinician'\n" +
"      \n" +
"        Attribute Nurse\n" +
"            #exactlyOne #Link.Users(UmcgNurses) \n" +
"            label = 'Nurse'\n" +
"            \n" +
"        Attribute BloodPressureCondition\n" +
"            #exactlyOne #text\n" +
"            label = 'Blood Pressure Condition'\n" +
"    Trigger\n" +
"        On activate invoke 'http://integration-producer:8081/v1/activate'\n" +
"        On complete invoke 'localhost:3001/connecare'\n" +
"        \n" +
"    SummaryPanel\n" +
"        Section BloodPressureMeasurement #left\n" +
'            label = "Systolic Pressure:"\n' +
"            InfoPath Evaluation.MeasureBloodPressure.Systolic\n" +
"\n" +
"        Section Diastolic #left\n" +
'            label = "Diastolic"\n' +
"            InfoPath Evaluation.MeasureBloodPressure.Diastolic \n" +
"            \n" +
"        Section DoctorNote #left\n" +
'            label = "Recommendations"\n' +
"            InfoPath Discharge.DischargePatient.DoctorNote\n" +
"\n" +
"    Stage Identification\n" +
"        #mandatory\n" +
"        owner = 'Setting.CaseOwner'\n" +
"        label = 'Identification'\n" +
"\n" +
"        HumanTask SelectPatient\n" +
"            #mandatory\n" +
"            label = 'Assign Patient'\n" +
"            dueDateRef = 'Setting.WorkplanDueDate'\n" +
"            externalId = 'SelectPatient'\n" +
"         \n" +
"            Form PatientAssignForm\n" +
"                #mandatory\n" +
"                 \n" +
"                InputField SelectPatient\n" +
"                    #custom\n" +
'                    CustomFieldValue = "Setting.CasePatient"\n' +
'                    label = "Assigned Patient"\n' +
"                    \n" +
"                InputField SelectDoctor\n" +
"                    #custom\n" +
'                    CustomFieldValue = "Setting.Clinician"\n' +
'                    label = "Assigned Clinician"\n' +
"       \n" +
"           Trigger\n" +
"                    On complete invoke 'http://127.0.0.1:3001/connecare' method post\n" +
"                    On complete invoke 'https://server1.com/api2' method Post with failureMessage 'Cannot complete the completion of data creation!'\n" +
"\n" +
"    Stage Evaluation\n" +
"        #mandatory\n" +
"        owner = 'Setting.Clinician'\n" +
"        label = 'Evaluation'\n" +
"        \n" +
"        Precondition\n" +
"            previousStep = 'Identification'\n" +
"            \n" +
"            HumanTask RequestMedicalTest\n" +
"                #notmandatory\n" +
"                owner = 'Setting.Clinician'\n" +
"                dueDateRef = 'Setting.WorkplanDueDate'\n" +
"                label = 'Request Medical Test'\n" +
"                \n" +
"                Precondition\n" +
"                    previousStep = 'MeasureBloodPressure'\n" +
"                    previousStep = 'MeasureBloodCholesterol'\n" +
`                    condition = 'Setting.BloodPressureCondition = "High"'\n` +
"\n" +
"\n" +
"                Form CgiForm\n" +
"                    InputField CholesterolTest\n" +
"                    #singlechoice\n" +
"                        question = 'Perform Blood Cholesterol Test?'\n" +
"                        Option 'No' value='0'\n" +
"                        Option 'Yes' value='1'\n" +
"                 \n" +
"    Stage MedicalTest\n" +
"        #mandatory\n" +
"        label = 'Medical Test'        \n" +
"        owner = 'Setting.Nurse'\n" +
"        \n" +
"        Precondition\n" +
"            previousStep = 'Evaluation'\n" +
"            condition = 'Evaluation.RequestMedicalTest.CholesterolTest = 1'\n" +
"            \n" +
"        HumanTask MeasureBloodCholesterol\n" +
"            #mandatory\n" +
"            owner = 'Setting.Nurse'\n" +
"            label = 'Record Blood Cholesterol'    \n" +
"            \n" +
"            Form PrescriptionForm\n" +
"                InputField CholesterolLvl\n" +
"                    #text #left #mandatory\n" +
'                    label = "Blood Cholesterol Level (mm/L):" \n' +
"                // FieldEnd\n" +
"\n" +
"    Stage Treatment\n" +
"        #mandatory\n" +
"        owner = 'Setting.Clinician'\n" +
"        label = 'Treatment'\n" +
"\n" +
"        // Define two Preconditions to express the OR logic between them\n" +
"        Precondition\n" +
"            previousStep = 'Evaluation' \n" +
"            condition = 'Evaluation.RequestMedicalTest.CholesterolTest = 0'\n" +
"        \n" +
"        \n" +
"    Stage Discharge\n" +
"        #mandatory #manualActivate\n" +
"        owner = 'Setting.CaseOwner'\n" +
"        label = 'Discharge'\n" +
"        \n" +
"        precndition\n" +
"            previousStep = 'Identification'\n" +
"        \n" +
"        HumanTask DischargePatient\n" +
"            #mandatory\n" +
"            owner = 'Setting.CaseOwner'\n" +
'            label = "Discharge Patient"\n' +
"            \n" +
"            Form DischargeForm\n" +
"                InputField DoctorNote \n" +
"                    #text\n" +
'                    label = "Post-Treatment Recommendation:"'