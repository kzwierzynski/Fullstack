import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GetRatesService} from '../../services/get-rates.service';
import {SellBuyService} from '../../services/sell-buy.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-buy-currency',
  templateUrl: './buy-currency.component.html',
  styleUrls: ['./buy-currency.component.css']
})
export class BuyCurrencyComponent implements OnInit {

  buyCurrency = 0;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string  = "Are you sure you want to make the transaction?"
  // public popoverMessage: string;
  public cancelClicked: boolean = false;

  constructor(
    private auth: AuthService,
    private rates: GetRatesService,
    private sellBuy: SellBuyService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.sellBuy.restoreNumCode();
    this.auth.getUser();
    this.rates.restoreRates();
  }

  // onClickUpdate(){
  //   this.popoverMessage = `Are you sure you want to buy ${ this.buyCurrency * this.rates.currUnits[this.sellBuy.i] } ${ this.rates.currCodes[this.sellBuy.i] } for ${ (this.rates.currRates.items[this.sellBuy.i].sellPrice * this.buyCurrency).toFixed(2)} PLN?`;
  // }
  
  onClickBuy(){
    this.sellBuy.data.buyCurrency= this.buyCurrency;
    this.sellBuy.data.num_code = this.sellBuy.i;
    this.sellBuy.data.user_id = this.auth.user.id;

    this.rates.buyCurrency(this.sellBuy.data)
    .subscribe(response =>{
      if (!response.success) {  
        // console.log("1");     
        this.flashMessage.show(response.msg, 
          { cssClass: 'alert-danger', timeout: 5000 });
      } else {
        // console.log("2"); 
        this.auth.updateWallet(response.wallet);
        this.flashMessage.show(response.msg, 
          { cssClass: 'alert-success', timeout: 5000 });
        // console.log("Users wallet updated: " + response.wallet);
      }
    },
  (err) =>{
    this.flashMessage.show("Sorry, something went wrong, please try again later.", 
    { cssClass: 'alert-danger', timeout: 5000 });
  });

    // console.log(this.sellBuy.response, this.sellBuy.i, this.rates.currRates.items[this.sellBuy.i].sellPrice);
  }

  onClickSell(){
    this.sellBuy.data.buyCurrency= this.buyCurrency;
    this.sellBuy.data.num_code = this.sellBuy.i;
    this.sellBuy.data.user_id = this.auth.user.id;
    // console.log(this.sellBuy.data, this.sellBuy.i, this.rates.currRates.items[this.sellBuy.i].sellPrice);
  }

}
