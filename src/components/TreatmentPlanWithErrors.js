export const treatmentPlanWithErrorsStr = '#aca0.1\n' +
'import extfile.redGreenUiRef as rgu\n' +
'import extfile.prescriptionTask as prescription\n' +
'\n' +
'workspace Umcg\n' +
'\n' +
'define case BC1_BloodCholesterol\n' +
"    prefix = 'BC1'\n" +
'    version = 4\n' +
"    label = 'Blood Cholesterol Treatment'\n" +
'    \n' +
'    Responsibilities\n' +
"        group UmcgPhysicians name = 'Umcg Physician' //staticId = 'asdf234' \n" +
"        group UmcgClinicians name = 'Umcg Clinician'\n" +
"        group UmcgProfessionals name = 'Umcg Professional' \n" +
"        group UmcgPatients name = 'Umcg Patient' \n" +
"        group UmcgNurses name = 'Umcg Nurse' \n" +
'\n' +
'    Setting\n' +
'        CaseOwner UmcgProfessionals #exactlyOne\n' +
"            label = 'UMCG Professionals' \n" +
'         \n' +
'        Attribute WorkplanDueDate\n' +
'            #exactlyOne #date.after(TODAY)\n' +
"            label = 'Workplan Due Date'\n" +
"            externalId = 'dueDateConnie'\n" +
'\n' +
'        CasePatient UmcgPatients #exactlyOne\n' +
"            label = 'Patient'\n" +
'          \n' +
'        Attribute Clinician\n' +
'            #exactlyOne #Link.Users(UmcgClinicians) \n' +
"            label = 'Clinician'\n" +
'      \n' +
'        Attribute Nurse\n' +
'            #exactlyOne #Link.Users(UmcgNurses) \n' +
"            label = 'Nurse'\n" +
'            \n' +
'        Attribute BloodPressureCondition\n' +
'            #exactlyOne #text\n' +
"            label = 'Blood Pressure Condition'\n" +
'    Trigger\n' +
"        On activate invoke 'http://integration-producer:8081/v1/activate'\n" +
"        On complete invoke 'localhost:3001/connecare'\n" +
'        \n' +
'    SummaryPanel\n' +
'        Section DoctorNote #left\n' +
'            label = "Recommendations"\n' +
'            InfoPath Discharge.DischargePatient.DoctorNote\n' +
'\n' +
'    Stage Identification\n' +
'        #mandatory\n' +
"        owner = 'Setting.CaseOwner'\n" +
"        label = 'Identification'\n" +
'\n' +
'        HumanTask SelectPatient\n' +
'            #mandatory\n' +
"            label = 'Assign Patient'\n" +
"            dueDateRef = 'Setting.WorkplanDueDate'\n" +
"            externalId = 'SelectPatient'\n" +
'         \n' +
'            Form PatientAssignForm\n' +
'                #mandatory\n' +
'                 \n' +
'                InputField SelectPatient\n' +
'                    #custom\n' +
'                    CustomFieldValue = "Setting.CasePatient"\n' +
'                    label = "Assigned Patient"\n' +
'                    \n' +
'                InputField SelectDoctor\n' +
'                    #custom\n' +
'                    CustomFieldValue = "Setting.Clinician"\n' +
'                    label = "Assigned Clinician"\n' +
'       \n' +
'           Trigger\n' +
"                    On complete invoke 'http://127.0.0.1:3001/connacare' method delete\n" +
"                    On complete invoke 'https://server1.com/api2' method Post with failureMessage 'Cannot complete the completion of data creation!'\n" +
'\n' +
'    Stage MedicalTest\n' +
'        #mandatory\n' +
"        label = 'Medical Test' \n" +
"        owner = 'Setting.Nurse'\n" +
'        \n' +
'        Precndtion\n' +
"            previousStep = 'Identification'\n" +
'            \n' +
'        HumanTask MeasureBloodCholesterol\n' +
'            #mandatory\n' +
"            owner = 'Setting.Nurse'\n" +
"            label = 'Record Blood Cholesterol'    \n" +
'            \n' +
'            Form PrescriptionForm\n' +
'                InputField CholesterolLvl\n' +
'                    #text #left #mandatory\n' +
'                    label = "Blood Cholesterol Level (mm/L):" \n' +
'                \n' +
'                OutputField CholesterolLvlAnalysis\n' +
'                #left \n' +
"                label = 'CholesterolLvl Assessment:'\n" +
`                expression = ' if (CholesterolMol < 80): "Normal"\n` +
'                              else if (CholesterolLvl <= 89) then "Elevated" \n' +
`                              else "High"'\n` +
'                              \n' +
'\n' +
'    Stage Treatment\n' +
'        #mandatory\n' +
"        group = 'Setting.Clinician'\n" +
"        label = 'Treatment'\n" +
'\n' +
'        // Define two Preconditions to express the OR logic between them\n' +
'        Precondition\n' +
"            previousStep = 'MedicalTest' \n" +
"            condition = 'MedicalTest.CholesterolLvl>100' \n" +

'\n' +
'        use Task prescription.Prescribe\n' +
'        \n' +
'    Stage Treatment\n' +
'        #mandatory #ActivateManually\n' +
"        owner = 'Setting.CaseOwner'\n" +
"        label = 'Discharge'\n" +
'        \n' +
'        Precondition\n' +
"            previousStep = 'Identification'\n" +
'        \n' +
'        HumanTask DischargePatient\n' +
'            #notmandatory\n' +
"            owner = 'Setting.CaseOwner'\n" +
'            label = "Discharge Patient"\n' +
'            \n' +
'            Form DischargeForm\n' +
'                InputField DoctorNote \n' +
'                    #text\n' +
'                    label = "Post-Treatment Recommendation:"'