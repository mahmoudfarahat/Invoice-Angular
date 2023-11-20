
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/shared/main-layout/main-layout.component';

const routes: Routes = [
  {
    path:"",component:MainLayoutComponent , loadChildren:()=>
    import("../app/modules/invoice/invoice.module").then(m=>m.InvoiceModule)
  },
  {
    path:"employee" ,component:MainLayoutComponent,
    loadChildren:()=> import("./modules/employee/employee.module").then(m=> m.EmployeeModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
