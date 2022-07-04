import GRAPH_COLOR_CODE from "../../setting/graphSetting/elementColors";

var cpPrefix = "";
var graphLinkArray = [];
const hookUrlMaxChars = 15;
const precondMaxLen = 50;


function createCpGraphNodeArray(cpDefJson) {
    var graphNodeArray = [];
    graphLinkArray = [];
    const stageList = cpDefJson.StageList;

    cpPrefix = cpDefJson.prefix;

    stageList.forEach((stage, index) => {
        stage.$.id = removePrefix(stage.$.id);
        graphNodeArray.push(createStageNode(stage, index));

        stage.$$.forEach((task) => {
            const taskNodes = createTaskNode(task,
                                             stage.$.id);
            taskNodes.forEach((taskElemNode) => {
               graphNodeArray.push(taskElemNode);
            });
        });
    });
    return graphNodeArray;
}

function createStageNode(stage, index) {

    var hasTransitionCondition = false;
    if (stage.SentryDefinition != null) {

        stage.SentryDefinition.forEach((condition) => {

            condition.precondition.forEach((precond) => {
                var condExpression = precond.$.simplifiedExpression;
                const previousStep = precond.$.processDefinitionId;

                var startNode = "";
                var linkLabel = "";
                // Parse link between stages as transition condition first.
                if (condExpression != null) {
                    hasTransitionCondition = true;

                    console.log("Found 1 transition cond\n" + condExpression);

                    let rootElement = removePrefix(precond.$.processDefinitionId);

                    // If the condition is long, only accepts the first 20 chars
                    // and 3 dots
                    if (condExpression.length > precondMaxLen) {
                        condExpression = condExpression.substring(0, precondMaxLen)
                                + "...";
                    }

                    const linkNode = {
                        from: rootElement,
                        to: stage.$.id,
                        condText: condExpression
                    };

                    graphLinkArray.push(linkNode);
                } // No transition condition = set Previous Step as start Node
                else if (previousStep != null)
                {
                    const linkNode = {
                        from: removePrefix(previousStep),
                        to: stage.$.id,
                    };
                    graphLinkArray.push(linkNode);
                }
            });

        });
    }

    var locationX =
        hasTransitionCondition ?
            index * 500 :
            index * 300;

    const stageNode = {
        key: stage.$.id,
        text: stage.$.id,
        bgColor: GRAPH_COLOR_CODE.STAGE,
        textColor: "white",
        loc: locationX + " 0",
        isGroup: true
    };
    return stageNode;
}

// Construct Task Node in the Graph along with
// Input/Output Fields and Hooks (external systems communication)
function createTaskNode(task, stageId) {
    var taskElements = [];
    task.$.id = removePrefix(task.$.id)

    const taskNode = {
        key: task.$.id,
        text: task.$.description,
        bgColor: GRAPH_COLOR_CODE.TASK,
        textColor: "white",
        group: stageId,
        isGroup: true
    };

    taskElements.push(taskNode);

    // Construct Input/Output Fields
    const fieldList = task.TaskParamDefinition;
    if (fieldList != null) {
        fieldList.forEach((field) => {
            var colorCode = field.$.fieldType === "input" ?
                GRAPH_COLOR_CODE.INPUTFIELD :
                GRAPH_COLOR_CODE.OUTPUTFIELD;

            var fieldName = field.$.path;
            fieldName = fieldName.substring(
                fieldName.lastIndexOf('.') + 1);

            const fieldNode = {
                key: field.$.path,
                text: fieldName,
                color: colorCode,
                stroke: "white",
                group: task.$.id
            };

            taskElements.push(fieldNode);
        });
    }

    // Construct external Request
    const taskHook = task.HttpHookDefinition;
    if (taskHook != null) {
        taskHook.forEach((hook) => {
            const shortenedUrl = (hook.$.url).length > hookUrlMaxChars ?
                (hook.$.url).substring(0, hookUrlMaxChars) + "..." :
                (hook.$.url);

            const hookNode = {
                key: `${task.$.id}_${hook.$.url}`,
                text: `On ${hook.$.on}\n
                       Call ${shortenedUrl}`,
                color: GRAPH_COLOR_CODE.EXTERNALCOMM,
                group: task.$.id
            }

            taskElements.push(hookNode);
        });
    }

    return taskElements;
}

function removePrefix(string) {
    // replace the first prefix string only
    return string.replace(cpPrefix, "");
}

function getLinkArray() {
    return graphLinkArray;
}

export default {
    createCpGraphNodeArray,
    getLinkArray
};
