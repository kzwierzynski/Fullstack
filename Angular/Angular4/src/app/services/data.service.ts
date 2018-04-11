import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor( private http : Http) { }

  public getData(url : string){
    return this.http.get(url)
    // .map( (res) => res.json());
      .toPromise()
      .then((resp)=>resp.json());
  }
}
