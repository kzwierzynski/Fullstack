import {Component} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app',
  templateUrl: 'app/views/app.component.html'
})
export class AppComponent {
  public currentDate : string;
  public sinceDate: string;
  constructor(){
    this.currentDate = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    this.sinceDate = moment('2018-01-01', 'YYYY-MM-DD').fromNow();
  }
}