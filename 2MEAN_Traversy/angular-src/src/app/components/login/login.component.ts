import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user: any;
  username: String;
  password: String;

  constructor(
    private flashMessage: FlashMessagesService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){

    const user = {
      username: this.username,
      password: this.password
    }

    this.auth.loginUser(user)
      .subscribe(data =>{
        if(!data.success){
          this.flashMessage.show(data.msg, 
            { cssClass: 'alert-danger', timeout: 5000 });
            this.router.navigate(['login']);

        } else {
          this.auth.storeData(data.token, data.user);

          this.flashMessage.show("You are now logged in", 
            { cssClass: 'alert-success', timeout: 3000 });

          this.router.navigate(['dashboard']);
        }
      });

  }


}
