import {Component, OnInit, AfterContentInit, AfterViewInit} from '@angular/core';
@Component({
  selector: 'app',
  templateUrl: 'app/views/app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewInit {
  messages : String[] = [];
  ngOnInit(){
    this.messages.push('OnInit')
  }
  ngAfterContentInit(){
    this.messages.push('AfterContentInit')
  }
  ngAfterViewInit(){
    this.messages.push('AfterViewInit')
  }
}