export default class SuccessHandler extends Object {
    constructor(statuscode, message, data = {}){
        super();
        this.status = true;
        this.statuscode = statuscode;
        this.message = message;
        this.data = data;
    }
}