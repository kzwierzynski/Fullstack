import {Component} from '@angular/core';
import {PersonComponent} from 'components/person.component';

@Component({
  selector: 'demo-app',
  templateUrl: 'views/app.component.html'
  // directives:  [PersonComponent]
})
export class AppComponent {
  public items : any[] = [{"firstName":"Kirkland","lastName":"Cooke","department":"MOBILDATA"},{"firstName":"Adrian","lastName":"Gallegos","department":"ULTRASURE"},{"firstName":"Francine","lastName":"Reeves","department":"SENTIA"},{"firstName":"Joanna","lastName":"Howard","department":"ISOPLEX"},{"firstName":"Esther","lastName":"Travis","department":"HAIRPORT"},{"firstName":"Lillie","lastName":"Burch","department":"BUZZNESS"},{"firstName":"Edwina","lastName":"Cabrera","department":"PEARLESEX"},{"firstName":"Vinson","lastName":"Ballard","department":"CAXT"},{"firstName":"Tania","lastName":"Sargent","department":"ENQUILITY"},{"firstName":"Carey","lastName":"Bowers","department":"EVENTAGE"}];
}