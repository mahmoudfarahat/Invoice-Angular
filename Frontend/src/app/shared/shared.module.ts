import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]


})
export class SharedModule { }
