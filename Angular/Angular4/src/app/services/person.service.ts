import { Injectable } from '@angular/core';
import {iPerson, iAddr} from './interfaces.data';

@Injectable()
export class PersonService {

  private person : iPerson = {
                              name: 'Chris Angel',
                              age: 27,
                              address: { city: 'Gliwice', street:'Mł. Pat. 6/221', country: 'PL'},
                              Hobbies: ['guitar', 'piano', 'food'],
                            }

  constructor() { 
    console.log('personService constructor ran')
  }
  
  public initPerson() : iPerson {
    return this.person;
  }

}

// export interface iPerson {
//   name:string;
//   age:number;
//   address: iAddr;
//   Hobbies:string[];
//   }

// export interface iAddr{
//   street: string;
//   city: string;
//   country: string;
// }
