import React from "react";

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import GRAPH_COLOR_CODE from "../setting/graphSetting/elementColors";
import './CpDiagram.css';



function initDiagram() {
    const $ = go.GraphObject.make;
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
    const diagram =
        $(go.Diagram,
            {
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
                model: new go.GraphLinksModel(
                    {
                        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    }),
                layout: $(go.TreeLayout,
                    { comparer: go.LayoutVertex.smartComparer })
            });

    diagram.groupTemplate =
        $(go.Group, "Auto",
            new go.Binding("lineNumber").makeTwoWay(),
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                alignment: go.Spot.Center,
                layout: $(go.LayeredDigraphLayout,
                    { direction: 180, columnSpacing: 10 }
                )
            },
            $(go.Shape, "RoundedRectangle",  // surrounds the Placeholder
                new go.Binding("fill", "bgColor"),
                {
                    parameter1: 20
                },
            ),
            $(go.Panel, "Vertical",
                {
                    defaultAlignment: go.Spot.Top,
                },
                $("SubGraphExpanderButton"),
                $(go.TextBlock,         // group title
                    {
                        font: "Bold 12pt Sans-Serif",
                        verticalAlignment: go.Spot.Top,
                        margin: 2
                    },

                    new go.Binding("stroke", "textColor"),
                    new go.Binding("text", "key")
                ),

                $(go.Placeholder,    // represents the area of all member parts,
                    {
                        padding: 10,
                    }
                )  // with some extra padding around them
            ),
        );


    // Define link to represent sentries (preconditions)
    diagram.linkTemplate =
        $(go.Link,
            {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.Bezier,
                corner: 10
            },
            $(go.Shape),                           // this is the link shape (the line)
            $(go.Shape, { toArrow: "Standard" }),  // this is an arrowhead
            $(go.TextBlock,                        // this is a Link label
                new go.Binding("text", "condText"),
                {
                    stroke: GRAPH_COLOR_CODE.CONDITION,
                    segmentOffset: new go.Point(0, -30),
                    segmentOrientation: go.Link.OrientUpright
                }
            )
        );

    // define a simple Node template
    diagram.nodeTemplate =
        $(go.Node, 'Auto',  // the Shape will go around the TextBlock
            new go.Binding("lineNumber").makeTwoWay(),
            new go.Binding('location',
                'loc',
                            go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'RoundedRectangle',
                { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                // Shape.fill is bound to Node.data.color
                new go.Binding('fill', 'color')),
            $(go.TextBlock,
                { margin: 8, editable: true },  // some room around the text
                new go.Binding('text').makeTwoWay(),
                new go.Binding('stroke').makeTwoWay(),
            )
        );

    diagram.addDiagramListener("ObjectDoubleClicked",
        function(e) {
            var part = e.subject.part;
            if (!(part instanceof go.Link)) {
                console.log("Clicked on " + part.data.lineNumber);
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
