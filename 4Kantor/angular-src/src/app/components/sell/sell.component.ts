import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GetRatesService} from '../../services/get-rates.service';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private rates: GetRatesService
  ) { }

  ngOnInit() {
    this.rates.restoreRates();
    this.auth.getUser();
  }

}
