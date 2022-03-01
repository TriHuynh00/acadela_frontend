'use strict'

import HttpService from "../HttpService";

export default class CompileService {
    //static baseUrl = "https://23f5-2a02-2455-5a2-6a00-6522-2cc5-6aca-fcf5.eu.ngrok.io/compile";

    static baseUrl = "http://localhost:3003/compile";
    //static baseUrl = "http://ec2-3-68-96-206.eu-central-1.compute.amazonaws.com:3003/compile";
    // static baseUrl = "https://5912-2a02-2455-5a2-6a00-287c-f702-4a9d-13f0.eu.ngrok.io/compile";
    static compileCode(codeObj) {
        return new Promise((resolve, reject) => {
            HttpService.post(this.baseUrl, codeObj, function(data) {
                resolve(data);
                console.log(data);
            }, function (error) {
                console.log(error)
                reject(error);
                return error;
            });
        });
    };
}

