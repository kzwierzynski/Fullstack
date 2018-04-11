import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goalAnimations', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('200ms', [
          animate('.8s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ])
        )]), {optional: true}),

        query(':leave',
          animate('.8s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ])
        ), {optional: true})
      ])
    ])
  ]

})

export class HomeComponent implements OnInit {
  itemCount: number = 1;
  btnTxt : string = 'Add an Item';
  newItem : string;
  bucketList : string[] =[];

  addItem(){
    this.bucketList.push(this.newItem);
    this.newItem = '';
    this.itemCount = this.bucketList.length;
    this.data.changeGoal(this.bucketList);
  }

  deleteItem(i : number){
    this.bucketList.splice(i,1);
    this.itemCount = this.bucketList.length;
    this.data.changeGoal(this.bucketList);
  }

  constructor(private data : DataService) { }

  ngOnInit() {
    this.data.globalList.subscribe( res => this.bucketList = res )
    this.data.changeGoal(this.bucketList);

    this.itemCount = this.bucketList.length;
  }

}
