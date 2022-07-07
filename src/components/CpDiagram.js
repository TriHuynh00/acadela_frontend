import React from "react";

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import GRAPH_COLOR_CODE from "../setting/graphSetting/elementColors";
import './CpDiagram.css';
import GraphElemTemplate from "../setting/graphSetting/graphTemplate";


function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
        $(go.Diagram,
            {
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                'clickCreatingTool.archetypeNodeData':
                    { text: 'new node', color: 'lightblue' },
                model: new go.GraphLinksModel(
                    {
                        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    }),
                layout: $(go.GridLayout,
                    {
                        wrappingWidth: 5000,
                        spacing: go.Size.parse("400 300")
                    }
                ),
                // layout: $(go.TreeLayout,
                //     {
                //         setsPortSpot: false,
                //         angle: 180,
                //         nodeSpacing: 100,
                //         layerSpacing: 200
                //     }
                // ),

            });

    // Group = Task or Stage
    diagram.groupTemplate =
        GraphElemTemplate.constructGroupTemplate($);

    // Link = Sentry
    diagram.linkTemplate =
        GraphElemTemplate.constructLinkTemplate($);

    // Node = Input/Output fields or Hooks (External Requests)
    diagram.nodeTemplate =
        GraphElemTemplate.constructNodeTemplate($);

    // When double-clicked on a graph element
    // Add the component line into an event (graphClick) and fire it.
    // The editor listens to this event and focuses on the line
    diagram.addDiagramListener("ObjectDoubleClicked",
        function(e) {
            let part = e.subject.part;
            if (part.data.lineNumber != null) {
                const event = new CustomEvent('graphClick',
                    { detail: part.data.lineNumber });
                window.dispatchEvent(event);
            }
        });

    return diagram;
}

function handleModelChange(changes) {
    //alert(changes);
}
function GoDiagram({nodeArray, linkArray}) {
    return (
        <div>
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={nodeArray}
                linkDataArray={linkArray}
                onModelChange={handleModelChange}
            />

        </div>
    );
}
export default GoDiagram;
