import { Injectable } from '@angular/core';

@Injectable()
export class SellBuyService {

  buy = true; // if true -> buy, if false -> sell
  i: number = 0;
  data: any = {};
  
  constructor() { }
  
  storeNumCode(num_code){
    localStorage.setItem('num_code', JSON.stringify(num_code));
    this.i = num_code;
  }

  restoreNumCode(){
    this.i = JSON.parse(localStorage.getItem('num_code'));
  }

}
