import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class GetRatesService{

  currRates: any;
  srvBlocked: boolean;
  currCodes = ["USD", "EUR", "CHF", "RUB", "CZK", "GBP"];
  currUnits = [1, 1, 1, 100, 100, 1];
  timer = 30000;

  constructor(
    private http: Http,
    private auth: AuthService,
    private flashMessage: FlashMessagesService
  ) {
    this.updateRates();
    setInterval(() => { 
      this.updateRates(); 
    }, this.timer);
   }


    

  getRates(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/exchange/current', {headers: headers})
      .map(res => res.json());
  }

  buyCurrency(data){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.auth.getToken();
    headers.append('Authorization', this.auth.authToken);

    return this.http.post('http://localhost:3000/exchange/buy', data, {headers: headers})
      .map(res => res.json());
  }

  sellCurrency(data){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.auth.getToken();
    headers.append('Authorization', this.auth.authToken);

    return this.http.post('http://localhost:3000/exchange/sell', data, {headers: headers})
      .map(res => res.json());
  }

  storeRates(rates){
    localStorage.setItem('rates', JSON.stringify(rates));
    this.currRates = rates;
  }

  restoreRates(){
    this.currRates = JSON.parse(localStorage.getItem('rates'));
  }

  updateRates(){
    this.getRates()
      .subscribe(data =>{
        if (!data.success) {  
          // console.log("1", data.srvBlocked);     
          this.srvBlocked = data.srvBlocked;
          this.flashMessage.show(data.msg, 
            { cssClass: 'alert-danger', timeout: 5000 });
        } else if (data.srvBlocked) {
          // console.log("2", data.srvBlocked); 
          this.srvBlocked = data.srvBlocked;
          this.flashMessage.show("Our servers are currently under maintenace. Temporarily all transactions are suspended. Sorry for the inconvenience.", 
            { cssClass: 'alert-danger', timeout: this.timer });
        } else {
          // console.log("3", data.srvBlocked); 
          this.srvBlocked = data.srvBlocked;
          this.storeRates(data.current);
          console.log(data.msg, data.current.publicationDate);
        }
      },
    (err) =>{
      this.flashMessage.show("Our servers are currently under maintenace. Temporarily all transactions are suspended. Sorry for the inconvenience.", 
      { cssClass: 'alert-danger', timeout: this.timer });
      this.srvBlocked = true;
    });
  }

}
