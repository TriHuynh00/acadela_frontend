'use strict'

import HttpService from "../HttpService";

export default class CompileService {

    static baseUrl = "http://localhost:3003/compile";

    static compileCode(codeObj) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseUrl, codeObj, function(data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });
    };
}

