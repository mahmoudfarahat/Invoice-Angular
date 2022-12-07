import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EmployeeService } from 'src/app/services/employee.service';


const route:Routes = [
  {path:"", component:ListComponent},
  {path:"create", component:CreateComponent},
  {path:"edit/:id", component:CreateComponent}
]

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[EmployeeService]
})
export class EmployeeModule { }
