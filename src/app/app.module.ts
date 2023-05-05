import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialAllModule } from '../material.module'; 
import { TruncatePipe } from './truncate.pipe';

import { RouterModule } from '@angular/router';
import { BokComponent } from './bok/bok.component';

import { ScrollingModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AppComponent,
    TruncatePipe,
    BokComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: ':conceptId', component: BokComponent },
      { path: '', component: BokComponent },
    ]),
    BrowserAnimationsModule,
    FormsModule,
    MaterialAllModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
