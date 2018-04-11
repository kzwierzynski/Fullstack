import {Component} from '@angular/core';
import {MsgService} from './msg.service';

@Component({
    selector: 'indicator-component',
    templateUrl: 'app/views/indicator.component.html',
    providers: [MsgService]
})

export class IndicatorComponent {
    private indicatorMsg : string;
    constructor( private _msgService : MsgService) {
        this.indicatorMsg = _msgService.getSuccessMsg();
    }
}