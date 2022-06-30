'use strict'

import HttpService from "../HttpService";

export default class CompileService {

    static baseUrl = "http://localhost:3003/compile";
    // static baseUrl = "https://23f5-2a02-2455-5a2-6a00-6522-2cc5-6aca-fcf5.eu.ngrok.io/compile";
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

