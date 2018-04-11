import {Injectable} from '@angular/core';

@Injectable()
export class MsgService{
    getErrorMsg() : string {
        return "Issue Occurred";
    }
    getSuccessMsg() : string {
        return "Success";
    }
}