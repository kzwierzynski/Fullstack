import {Component} from '@angular/core';
import {IndicatorComponent} from './indicator.component'
import {MsgService} from './msg.service';

@Component({
  selector: 'app',
  templateUrl: "app/views/app.component.html",
  providers: [MsgService]
})
export class AppComponent {
  private appMsg : string;
  constructor (private _msgService : MsgService){
    this.appMsg = _msgService.getErrorMsg();
  }
}