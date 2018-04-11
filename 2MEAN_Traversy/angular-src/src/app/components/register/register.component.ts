import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validate: ValidateService, 
              private flashMessage: FlashMessagesService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validate.validateData(user)){
      this.flashMessage.show('Please fill in all the fields', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if(!this.validate.validateEmail(user.email)){
      this.flashMessage.show('Please fill in a valid email address', 
      { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.auth.registerUser(user).subscribe(data => {
      console.log(data);
      if (!data.success){
        this.flashMessage.show(data.msg, 
          { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/register']);

      } else {
        this.flashMessage.show(data.msg, 
          { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
      }
    });
  }

}
