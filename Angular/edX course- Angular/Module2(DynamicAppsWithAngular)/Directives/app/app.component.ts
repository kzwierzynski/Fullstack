import {Component} from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: 'app/views/app.component.html'
})
export class AppComponent {
  public showPanel : boolean = true;
  public getStyles() {
  return {
      'font-style': 'italic',
      'font-weight': 'bold'
    }
  }
  public getClasses() {
    return {
      'highlight': true,
      'strike': false
    }
  } 
}