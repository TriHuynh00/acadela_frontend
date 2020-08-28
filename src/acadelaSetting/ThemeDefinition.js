
export default class ThemeDefinition {
    static themeDef = {
        base: 'vs',
        inherit: false,
        rules: [
            { token: 'obj-keywords', foreground: '660066', fontStyle: 'bold' },
            { token: 'atr-keywords', foreground: '1167b1', fontStyle: 'bold' },
            { token: 'error', foreground: 'b4151c' },
            { token: 'str', foreground: '4ca973' }
        ]
    };
}