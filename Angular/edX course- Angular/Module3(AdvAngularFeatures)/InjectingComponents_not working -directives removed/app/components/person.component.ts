import {Component, Input} from '@angular/core';

@Component({
    selector: 'person-details',
    templateUrl: './person.component.html',
})
export class PersonComponent {
    @Input() context : any;
}