import HttpService from "../HttpService";


function parseJsonCpService(cpJson) {
    console.log(cpJson);

    const cp = JSON.parse(cpJson);

    const wp = cp.jsonTemplate
                        .SACMDefinition
                        .Workspace;

    const caseDef = wp[0].CaseDefinition[0].$;
    // Grab the prefix and underscore to remove them in the graph
    caseDef.prefix = caseDef.id.substring(
                        0,
                        caseDef.id.indexOf('_') + 1);
    const stageLists = wp[0].CaseDefinition[0].StageDefinition

    stageLists.forEach((stage, index) => {
        addFieldType(stage, wp);
    });

    caseDef.StageList = stageLists;
    console.log(caseDef);
    return caseDef;
}

// function parseTask(stage) {
//     const taskList = stage.$$;
//     console.log(`Task Lists\n${taskList}`);
//     taskList.forEach((task) => {
//         addFieldType(task);
//     });
// }

function addFieldType(stage, wp) {
    stage.$$.forEach((task) => {

        // Find the entity of the task
        var taskEntity = wp[0].EntityDefinition.filter((entity) => {
            return entity.$.id == task.$.id;
        });

        console.log(JSON.stringify(taskEntity));

        if (taskEntity.length == 1) {
            taskEntity = taskEntity[0];
        }

        const fieldList = task.TaskParamDefinition;
        fieldList.forEach((field) => {
            var fieldName = field.$.path;
            fieldName = fieldName.substring(
                fieldName.lastIndexOf('.') + 1);

            // if the field matches an Attribute, it is an InputField
            const fieldMatchInputAttr =
                taskEntity.AttributeDefinition.filter((attr) => {
                    return attr.$.id == fieldName;
                });

            if (fieldMatchInputAttr.length == 1) {
                field.$.fieldType = "input";
                console.log(`${fieldName} is an input);`);
            } else {
                field.$.fieldType = "output";
                console.log(`${fieldName} is an output);`);
            }
        });
    });
    return stage;
}

export default parseJsonCpService;

