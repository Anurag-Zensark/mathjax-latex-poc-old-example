import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//
import { AppComponent } from './app.component';
// import { MathjaxModule as DevMathjaxModule } from 'mathjax-lib';
//
import { MathjaxModule } from 'mathjax-angular';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
// import { NgOpendrawModule } from 'ng-opendraw';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // for dev mode testing
    // DevMathjaxModule.forRoot(),
    MathjaxModule.forRoot(),
    // NgOpendrawModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
