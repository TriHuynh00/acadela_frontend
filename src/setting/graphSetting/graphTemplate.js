import * as go from "gojs";
import GRAPH_COLOR_CODE from "./elementColors";

class GraphElemTemplate {
    // A Group represents a Stage or Task
    static constructGroupTemplate = ($) => {
        return $(go.Group, "Auto",
            new go.Binding("lineNumber").makeTwoWay(),
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                alignment: go.Spot.Center,
                layout: $(go.LayeredDigraphLayout,
                    { direction: 180, columnSpacing: 10 }
                ),

                fromSpot: go.Spot.RightSide,
                toSpot: go.Spot.LeftSide,


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
            )
        );
    };

    // Define link to represent sentries (preconditions)
    static constructLinkTemplate = ($) => {
        return $(go.Link,
            new go.Binding("fromSpot", "fromSpot", go.Spot.parse),
            new go.Binding("toSpot", "toSpot", go.Spot.parse),
            new go.Binding("lineNumber").makeTwoWay(),
            {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                toEndSegmentLength: 30,
                fromEndSegmentLength: 30,
                corner: 2
            },
            $(go.Shape, {strokeWidth: 2}),           // this is the link shape (the line)
            $(go.Shape,
                new go.Binding("toArrow").makeTwoWay(),
                new go.Binding("fill").makeTwoWay(),
                {scale: 3}
            ),  // this is an arrowhead
            $(go.TextBlock,                        // this is a Link label
                new go.Binding("text", "condText"),
                {
                    stroke: GRAPH_COLOR_CODE.CONDITION,
                    segmentOffset: new go.Point(0, -30),
                    segmentOrientation: go.Link.OrientUpright,
                }
            )
        );
    };

    // Represent Input/Output fields
    // and Hooks (External Communication Requests)
    static constructNodeTemplate = ($) => {
        return $(go.Node, 'Auto',  // the Shape will go around the TextBlock
            new go.Binding("lineNumber").makeTwoWay(),
            new go.Binding('location',
                'loc',
                go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Rectangle',
                { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
                // Shape.fill is bound to Node.data.color
                new go.Binding('fill', 'color')),
            $(go.TextBlock,
                { margin: 8, editable: true },  // some room around the text
                new go.Binding('text').makeTwoWay(),
                new go.Binding('stroke').makeTwoWay(),
            )
        );
    };
}

export default GraphElemTemplate;
