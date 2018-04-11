import {Component, OnInit} from '@angular/core';

@Component({  // specify a Component decorator for the component class you are creating
  selector: 'example-component', // new property (Within the Component attribute object) named "selector"
  // template: `<h2>Greeting</h2><p>{{message}}</p>`
  templateUrl: 'app/example.component.html'
})
export class ExampleComponent implements OnInit { //declaration that it implements the OnInit interface:
  public message: string;
    constructor() { }
    private ngOnInit() {        
        this.message = 'Hello World';
    }
  }//adding new class