import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

username: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getUser();
    this.username = this.auth.user.username;
  }

  onClickLogout(){
    this.auth.logout();
    this.flashMessage.show("You've been logged out. See you soon!", 
            { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
    return false;
  }
}
