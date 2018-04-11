import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router'; 
import {DataService} from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private bucketList : any;

  constructor(private actRoute : ActivatedRoute, private router : Router, private data : DataService) { 
    this.actRoute.params.subscribe(res => console.log(res.id, res.sth))
   }

   sendHome(){
     this.router.navigate( [''] );
   }

  ngOnInit() {
    this.data.globalList.subscribe( res => this.bucketList = res)
  }

}
