import HttpService from "../HttpService";

export default class CaseJsonParserService {
    static parseJsonCp(cpJson) {
        console.log(cpJson);

        const cp = JSON.parse(cpJson);
        console.log(cp['jsonTemplate']);
        const stageList = cp['jsonTemplate'];

        // stageList.forEach((stage) => {
        //    console.log(stage['id']);
        // });
    }
}
