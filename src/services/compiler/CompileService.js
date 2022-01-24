'use strict'

import HttpService from "../HttpService";

export default class CompileService {

    static baseUrl = "http://localhost:3003/compile";
    //static baseUrl = "http://ec2-3-68-96-206.eu-central-1.compute.amazonaws.com:3003/compile";

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

