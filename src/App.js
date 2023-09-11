import React, {useState} from "react";
import monaco from 'react-monaco-editor';
import Editor from "./components/Editor";
import GoDiagram from "./components/CpDiagram";

function App () {
    const[nodeDataArray, setNodeDataArray] = useState(
        [
            { key: 0, text: 'Please click the "Validate" button to visualize your CP', color: 'lightblue', loc: '0 0' },
        ]
    );

    const[linkDataArray, setLinkDataArray] = useState([]);

    const updateNodeList = (nodeList) => {
        setNodeDataArray(nodeList);
        console.log("Node List Updated");
    };

    return (
        <div style={{display: "flex"}}>

            <Editor setNodeDataArray={updateNodeList}
                    setLinkDataArray={setLinkDataArray}sr       />

            <GoDiagram nodeArray={nodeDataArray}
                       linkArray={linkDataArray}/>
        </div>
    )

}
export default App;
