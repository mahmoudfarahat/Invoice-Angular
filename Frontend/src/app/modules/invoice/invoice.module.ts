import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Routes , RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatNativeDateModule , MatRippleModule } from '@angular/material/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListComponent } from './list/list.component';

const router:Routes = [
  {path:"" , component:ListComponent},
  {path:"create" , component:CreateComponent},
  {path:"edit/:id" , component:EditComponent}

]

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      },

    }),
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatNativeDateModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule


  ],
  providers: [DatePipe],
})
export class InvoiceModule { }
