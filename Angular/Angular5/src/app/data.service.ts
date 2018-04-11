import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class DataService {

  private bucketList = new BehaviorSubject<any>(['Add a first goal to the bucket list']);
  globalList = this.bucketList.asObservable();

  constructor() { }

  public changeGoal(globalList){
    this.bucketList.next(globalList);
  }
}
