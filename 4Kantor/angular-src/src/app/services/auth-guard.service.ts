import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}
 
  canActivate() {
    if(this.auth.loggedIn()) {
      return true;
    } else {
      this.flashMessage.show('Please login first. You are unauthorized to enter desired destination.', 
        { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['login']);
      return false;
    }
  }
}