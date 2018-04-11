import { Component, OnInit } from '@angular/core';
import { iPerson, iAddr, iPost } from '../../services/interfaces.data';
import { PersonService } from '../../services/person.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private person: iPerson;
  public urlData : iPost[];
  
  constructor(private personService : PersonService, private dataService : DataService){
    console.log('constructor ran');
  }

  public getPerson(){
    this.person = this.personService.initPerson();
  }

  ngOnInit(){
    console.log('ngOnInit ran')
    this.getPerson();
    console.log(this.person)
    this.dataService.getData('https://jsonplaceholder.typicode.com/posts')
                                  .then( (val)=> {
                                    this.urlData = val;
                                    // console.log(this.urlData[0]);
                                  });

  }
  addHobby(hobby : string){
    this.person.Hobbies.push(hobby);
  }

  deleteHobby(i : number){
    this.person.Hobbies.splice(i,1);
  }

  
  

}


// interface iPerson {
//   name:string,
//   age:number,
//   address: iAddr,
//   Hobbies:string[],
//   }

// interface iAddr{
//   street: string,
//   city: string,
//   country: string
// }