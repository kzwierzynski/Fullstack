import {Component} from '@angular/core';
import * as DataManager from './sample.module'

@Component({
  selector: 'app',
  templateUrl: 'app/views/app.component.html'
})
export class AppComponent {
  public numExample : number = new DataManager.NumberGetter().getNumber();
  public strExample : string = new DataManager.StringGetter().getString();
}