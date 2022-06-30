import React, {useState} from "react";
import Editor from "./components/Editor";
import GoDiagram from "./components/CpDiagram";

function App () {
    const[nodeDataArray, setNodeDataArray] = useState(
        [
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
            { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
        ]
    );
    const[linkDataArray, setLinkDataArray] = useState(
        [
            { key: -1, from: 0, to: 1 },
            { key: -2, from: 0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
        ]
    );

    const updateNodeList = (nodeList) => {
        setNodeDataArray(nodeList);
        console.log("Node List Updated");
    };

    return (
        <div style={{display: "flex"}}>
            <Editor setNodeDataArray={updateNodeList} setLinkDataArray={setLinkDataArray}/>
            <GoDiagram nodeArray={nodeDataArray} linkArray={linkDataArray}/>
        </div>
    )

}
export default App;
