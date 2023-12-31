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
                let condExpression = precond.$.simplifiedExpression;
                const previousStep = precond.$.processDefinitionId;

                let linkNode = {};

                // Parse link between stages as transition condition first.
                if (condExpression != null) {
                    hasTransitionCondition = true;

                    console.log("Found 1 transition cond\n" + condExpression);

                    let fromProcess = removePrefix(precond.$.processDefinitionId);

                    // If the condition is long, only render the first 20 chars
                    // and 3 dots
                    if (condExpression.length > precondMaxLen) {
                        condExpression = condExpression.substring(0, precondMaxLen)
                                + "...";
                    }

                    linkNode = {
                        from: fromProcess,
                        to: stage.$.id,
                        toArrow: "Diamond",
                        fill: "yellow",
                        condText: "from " + fromProcess
                        // condText: condExpression
                    };
                    // Repeated stage has a diamond from bottom to left
                    if (fromProcess == stage.$.id) {
                        linkNode.fromSpot = "TopLeft";
                        linkNode.toSpot = "Top";
                        linkNode.condText = "";
                    }

                } // No transition condition = set Previous Step as start Node
                else if (previousStep != null)
                {
                     linkNode = {
                        from: removePrefix(previousStep),
                        to: stage.$.id,
                        toArrow: "Standard",
                        fill: "black"
                    };

                }

                if (linkNode != {}) {
                    if (precond.$.lineNumber != null) {
                        linkNode.lineNumber = precond.$.lineNumber['0'];
                    }
                    graphLinkArray.push(linkNode);
                }

                // Repeated stage has a diamond from bottom to left
                if (removePrefix(previousStep) == stage.$.id) {
                    linkNode.fromSpot = "TopLeft";
                    linkNode.toSpot = "Top";
                    linkNode.condText = "";
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
        label: stage.$.id,
        //text: stage.$.description,
        bgColor: GRAPH_COLOR_CODE.STAGE,
        textColor: "white",
        // loc: locationX + " 0",
        isGroup: true,
        lineNumber: stage.$.lineNumber['0']
    };
    return stageNode;
}

// Construct Task Node in the Graph along with
// Input/Output Fields and Hooks (external systems communication)
function createTaskNode(task, stageId) {
    var taskElements = [];
    task.$.id = removePrefix(task.$.id);

    const taskNode = {
        key: stageId + "_" + task.$.id,
        label: task.$.id,
        //text: task.$.description,
        bgColor: GRAPH_COLOR_CODE.TASK,
        textColor: "white",
        group: stageId,
        isGroup: true,
        lineNumber: task.$.lineNumber['0']
    };

    taskElements.push(taskNode);

    // Construct Input/Output Fields
    const fieldList = task.TaskParamDefinition;
    if (fieldList != null) {
        fieldList.forEach((field) => {
            var colorCode = "";
            if (field.$.fieldType === "inputfield") {
                colorCode = GRAPH_COLOR_CODE.INPUTFIELD;
            } else if (field.$.fieldType === "outputfield") {
                colorCode = GRAPH_COLOR_CODE.OUTPUTFIELD;
            } else {
                colorCode = 'orange'; // Unknown field type!
            }

            var fieldName = field.$.path;
            if (field.$.acadelaId != null) {
                fieldName = field.$.acadelaId;
            } else {
                fieldName = fieldName.substring(
                    fieldName.lastIndexOf('.') + 1);
            }

            const fieldNode = {
                key:  `${stageId}_${task.$.id}_${field.$.path}`,
                text: fieldName,
                color: colorCode,
                stroke: "white",
                group: stageId + "_" + task.$.id,
                lineNumber: field.$.lineNumber['0']
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
                key: `${stageId}_${task.$.id}_${hook.$.url}_${hook.$.method}`,
                text: `On ${hook.$.on}\n
                       Call ${shortenedUrl}`,
                color: GRAPH_COLOR_CODE.EXTERNALCOMM,
                group: stageId + "_" + task.$.id,
                lineNumber: hook.$.lineNumber['0']
            };

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
