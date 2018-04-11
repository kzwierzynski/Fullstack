import {Component} from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: 'app/views/app.component.html'
})
export class AppComponent {
  public count : number = 2;
  public indicator : boolean = true;
  public msgs : string[] = ['Alpha', 'Bravo', 'Charlie'];
  public title : string = 'Template binging';
}