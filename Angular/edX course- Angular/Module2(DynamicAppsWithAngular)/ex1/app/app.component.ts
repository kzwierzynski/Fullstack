import {Component} from '@angular/core';
import {TextGenerator} from './demo.module'

@Component({
  selector: 'app',
  templateUrl: 'app/views/app.component.html'
})
export class AppComponent {
  public message : string;  //property of type string named message
  constructor() {
    let generator = new TextGenerator();
    this.message = generator.GetText();
  }
}