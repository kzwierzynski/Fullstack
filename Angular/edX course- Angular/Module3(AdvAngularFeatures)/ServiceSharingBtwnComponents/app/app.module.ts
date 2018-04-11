import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {IndicatorComponent} from './indicator.component'
import {MsgService} from './msg.service'

@NgModule({
    imports:      [ 
        BrowserModule 
    ],
    declarations: [ 
        AppComponent,
        IndicatorComponent
    ],
    providers: [
        MsgService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
