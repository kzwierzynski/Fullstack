import {Component} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app',
  templateUrl: 'app/views/app.component.html'
})
export class AppComponent {
  public myIP : string;
  constructor(private http : Http) {
    this.http.get('http://httpbin.org/ip')
          .toPromise()
          .then( response => this.myIP = response.json().origin )
          .catch( err => console.log(err)  );
  }
}