import HttpService from "../HttpService";

export default parseJsonCpService;

function parseJsonCpService(cpJson) {
    console.log(cpJson);

    const cp = JSON.parse(cpJson.toString().trim());

    const wp = cp.jsonTemplate
                        .SACMDefinition
                        .Workspace;

    const caseDef = wp[0].CaseDefinition[0].$;
    // Grab the prefix and underscore to remove them in the graph
    caseDef.prefix = caseDef.id.substring(
                        0,
                        caseDef.id.indexOf('_') + 1);
    const stageLists = wp[0].CaseDefinition[0].StageDefinition;

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
