'use strict';
import * as monaco from 'monaco-editor';
import LanguageDefinition from "./LanguageDefinition";
import ThemeDefinition from "./ThemeDefinition";
import AutoCompleteProvider from "./AutoCompleteProvider";

export default class Acadela {

    static getName() {return 'Acadela';}

    static getThemeName() {return 'AcadelaTheme';}

    static languageDef = LanguageDefinition.languageDef;

    static themeDef = ThemeDefinition.themeDef;

    static getAutoCompleteProvider(monaco) {
        return AutoCompleteProvider.defineAutoComplete(monaco);
    }
}


