import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './modules/shared/shared.module';
import { TrimPipe } from './pipes/trim.pipe';
@NgModule({
  declarations: [
    AppComponent,
    TrimPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
