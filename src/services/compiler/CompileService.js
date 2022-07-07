'use strict'

import HttpService from "../HttpService";

export default class CompileService {

    // static baseUrl = "http://localhost:3003/compile";
    static baseUrl = "https://ed25-2a09-80c0-192-0-813-7eec-b939-a5e.eu.ngrok.io/compile";
    // static baseUrl = "http://e91b-2001-9e8-2c5e-e800-4581-e967-fb4c-a0a6.eu.ngrok.io/compile";

    static compileCode(codeObj) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseUrl, codeObj, function(data) {

                console.log(data);
                resolve(data);
            }, function (error) {
                console.log(error)
                reject(error);
                return error;
            });
        });
    };
}

