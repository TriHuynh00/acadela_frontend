# Acadela Frontend #

The IDE and Visualizer of the Acadela DSL as a React Application.

# Monaco Dependency

In case the IDE does not function properly, please use the below version of Monaco dependencies: 

```
"monaco-editor": "0.27.0",
"react-monaco-editor": "0.27.0",
"monaco-editor-webpack-plugin": "3.0.0"
```

For the visualizer, the following GoJS dependencies are used:

```
"gojs": "2.2.12",
"gojs-react": "1.1.1",
```

# Installation and run

npm install  
npm start

# Non-local deployment of the Acadela Backend

In case the Acadela backend is not in the same machine as the frontend, the *baseUrl* to the Acadela backend in src/services/compiler/CompileService.js shall be changed accordingly.


