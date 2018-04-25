import { Component, OnInit } from '@angular/core';
import {GetRatesService} from '../../services/get-rates.service';
import {SellBuyService} from '../../services/sell-buy.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  constructor(
    private rates: GetRatesService,
    private sellBuy: SellBuyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.rates.restoreRates();
  }

  buyCurrency(i : number){
    this.rates.updateRates();
    this.sellBuy.buy = true;
    this.sellBuy.i = i;
    this.sellBuy.storeNumCode(i);
    this.router.navigate(['buyCurrency']);
  }
  

}
